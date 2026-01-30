import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import {
  getMainCodingPrompt,
  screenshotToCodePrompt,
  softwareArchitectPrompt,
} from "@/lib/prompts";
import { getAIClient, getModelName, getFastUtilityClient } from "@/lib/ai-client";

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, quality, screenshotUrl } = await request.json();

    const prisma = getPrisma();
    const chat = await prisma.chat.create({
      data: {
        model,
        quality,
        prompt,
        title: "",
        shadcn: true,
      },
    });

    // Get the main AI client for the selected model
    const mainClient = getAIClient({ model, chatId: chat.id });

    // Get a fast utility client for title generation and example matching
    const { client: utilityClient, model: utilityModel } = getFastUtilityClient();

    async function fetchTitle() {
      const responseForChatTitle = await utilityClient.chat.completions.create({
        model: utilityModel,
        messages: [
          {
            role: "system",
            content:
              "You are a chatbot helping the user create a simple app or script, and your current job is to create a succinct title, maximum 3-5 words, for the chat given their initial prompt. Please return only the title.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      const title = responseForChatTitle.choices[0].message?.content || prompt;
      return title;
    }

    async function fetchTopExample() {
      const findSimilarExamples = await utilityClient.chat.completions.create({
        model: utilityModel,
        messages: [
          {
            role: "system",
            content: `You are a helpful bot. Given a request for building an app, you match it to the most similar example provided. If the request is NOT similar to any of the provided examples, return "none". Here is the list of examples, ONLY reply with one of them OR "none":

            - landing page
            - blog app
            - quiz app
            - pomodoro timer
            `,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const mostSimilarExample =
        findSimilarExamples.choices[0].message?.content || "none";
      return mostSimilarExample;
    }

    const [title, mostSimilarExample] = await Promise.all([
      fetchTitle(),
      fetchTopExample(),
    ]);

    let fullScreenshotDescription;
    if (screenshotUrl) {
      // Use OpenRouter for vision tasks (screenshot to code)
      const visionClient = getAIClient({ model: "openai/gpt-4o", chatId: chat.id });
      const screenshotResponse = await visionClient.chat.completions.create({
        model: "openai/gpt-4o",
        temperature: 0.4,
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: screenshotToCodePrompt },
              {
                type: "image_url",
                image_url: {
                  url: screenshotUrl,
                },
              },
            ],
          },
        ],
      });

      fullScreenshotDescription =
        screenshotResponse.choices[0].message?.content;
    }

    let userMessage: string;
    if (quality === "high") {
      let initialRes = await mainClient.chat.completions.create({
        model: getModelName(model),
        // model: "moonshotai/Kimi-K2-Thinking",
        messages: [
          {
            role: "system",
            content: softwareArchitectPrompt,
          },
          {
            role: "user",
            content: fullScreenshotDescription
              ? fullScreenshotDescription + prompt
              : prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 3000,
      });

      console.log("PLAN:", initialRes.choices[0].message?.content);

      userMessage = initialRes.choices[0].message?.content ?? prompt;
    } else if (fullScreenshotDescription) {
      userMessage =
        prompt +
        "RECREATE THIS APP AS CLOSELY AS POSSIBLE: " +
        fullScreenshotDescription;
    } else {
      userMessage = prompt;
    }

    let newChat = await prisma.chat.update({
      where: {
        id: chat.id,
      },
      data: {
        title,
        messages: {
          createMany: {
            data: [
              {
                role: "system",
                content: getMainCodingPrompt(mostSimilarExample),
                position: 0,
              },
              { role: "user", content: userMessage, position: 1 },
            ],
          },
        },
      },
      include: {
        messages: true,
      },
    });

    const lastMessage = newChat.messages
      .sort((a, b) => a.position - b.position)
      .at(-1);
    if (!lastMessage) throw new Error("No new message");

    return NextResponse.json({
      chatId: chat.id,
      lastMessageId: lastMessage.id,
    });
  } catch (error: any) {
    console.error("Error creating chat:", error?.message || error);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Failed to create chat", details: error?.message },
      { status: 500 },
    );
  }
}
