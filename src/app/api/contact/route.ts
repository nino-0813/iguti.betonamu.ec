import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'お名前、メールアドレス、お問い合わせ内容は必須です。' },
        { status: 400 }
      );
    }

    // TODO: ここでメール送信（Resend / SendGrid / など）を組み合わせられます
    // console.log('Contact form:', { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: '送信に失敗しました。しばらく経ってからお試しください。' },
      { status: 500 }
    );
  }
}
