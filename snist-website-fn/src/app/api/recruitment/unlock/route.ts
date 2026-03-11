import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for recruitment unlock
const recruitmentUnlockSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string()
        .email('Invalid email address')
        .refine(
            (email) => {
                const domain = email.toLowerCase().split('@')[1];
                // Accept any subdomain ending in .sreenidhi.edu.in or .shu.edu.in
                return domain && (domain.endsWith('sreenidhi.edu.in') || domain.endsWith('shu.edu.in'));
            },
            { message: 'Only emails from sreenidhi.edu.in or shu.edu.in domains are accepted (including department subdomains like @ece.sreenidhi.edu.in)' }
        ),
    mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
    passingOutYear: z.string().min(4, 'Please enter a valid year').max(4, 'Please enter a valid year'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the data
        const validatedData = recruitmentUnlockSchema.parse(body);

        // Get backend URL and API key from environment
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
            console.error('NEXT_PUBLIC_API_KEY not configured');
            return NextResponse.json(
                {
                    success: false,
                    message: 'Server configuration error',
                },
                { status: 500 }
            );
        }

        try {
            const backendResponse = await fetch(
                `${backendUrl}/api/recruitment/unlock`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    },
                    body: JSON.stringify(validatedData),
                }
            );

            let backendData;
            const contentType = backendResponse.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
                backendData = await backendResponse.json();
            } else {
                const text = await backendResponse.text();
                console.error(`Non-JSON response from backend (Status: ${backendResponse.status}):`, text.substring(0, 200));
                return NextResponse.json(
                    {
                        success: false,
                        message: `Backend service is currently unavailable or returned an invalid response (Status: ${backendResponse.status}).`,
                    },
                    { status: backendResponse.status >= 500 ? backendResponse.status : 502 }
                );
            }

            if (!backendResponse.ok) {
                return NextResponse.json(
                    {
                        success: false,
                        message: backendData?.error || backendData?.message || 'Failed to unlock challenges',
                    },
                    { status: backendResponse.status }
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Successfully unlocked challenges',
                data: backendData.data,
            });
        } catch (fetchError) {
            console.error('Backend connection error:', fetchError);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Could not connect to backend server. Please try again later.',
                },
                { status: 503 }
            );
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.issues.map(issue => issue.message).join('. '),
                    errors: error.issues
                },
                { status: 400 }
            );
        }

        console.error('Recruitment unlock error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
