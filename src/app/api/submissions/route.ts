import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const submissionSchema = z.object({
  fullName: z.string().min(1),
  yearOfStudy: z.string().min(1),
  fieldMajor: z.string().min(1),
  linkedinProfile: z.string().optional(),
  telegramUsername: z.string().min(1),
  confirmStay: z.string().min(1),
  hoursPerWeek: z.string().min(1),
  aiLevel: z.string().min(1),
  toolsTechnologies: z.array(z.string()),
  interests: z.array(z.string()),
  whyJoin: z.string().min(1),
  yearGoals: z.string().min(1),
  hasProjectExperience: z.string().min(1),
  projectDescription: z.string().optional(),
  chatMessages: z.any()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = submissionSchema.parse(body);

    const submission = await prisma.submission.create({
      data: {
        fullName: validatedData.fullName,
        yearOfStudy: validatedData.yearOfStudy,
        fieldMajor: validatedData.fieldMajor,
        linkedinProfile: validatedData.linkedinProfile || '',
        telegramUsername: validatedData.telegramUsername,
        confirmStay: validatedData.confirmStay,
        hoursPerWeek: validatedData.hoursPerWeek,
        aiLevel: validatedData.aiLevel,
        toolsTechnologies: validatedData.toolsTechnologies,
        interests: validatedData.interests,
        whyJoin: validatedData.whyJoin,
        yearGoals: validatedData.yearGoals,
        hasProjectExperience: validatedData.hasProjectExperience,
        projectDescription: validatedData.projectDescription || '',
        chatMessages: validatedData.chatMessages || [],
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
