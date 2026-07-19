import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (appsScriptUrl) {
      // Forward to Google Apps Script Web App (updates Sheet + sends Email)
      const response = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Google Apps Script responded with status ${response.status}`);
      }

      const resText = await response.text();
      try {
        const resData = JSON.parse(resText);
        return NextResponse.json({ status: "success", data: resData });
      } catch (jsonErr) {
        console.error("Failed to parse Apps Script response as JSON. Raw response preview:");
        console.error(resText.slice(0, 1000)); // Log first 1000 chars of HTML/error page
        throw new Error("Google Apps Script did not return valid JSON. It likely returned a Google Login redirect or execution error page.");
      }
    } else {
      // Fallback to FormSubmit.co (sends free email only)
      const response = await fetch("https://formsubmit.co/ajax/imamshadin004@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...body,
          _subject: `KrishiLink Inquiry: ${body.FormType || "General Submission"}`,
          _captcha: "false" // Bypasses captcha for Ajax requests
        }),
      });

      if (!response.ok) {
        throw new Error(`FormSubmit responded with status ${response.status}`);
      }

      const resData = await response.json();
      console.log("DEBUG FormSubmit response:", resData);
      return NextResponse.json({ 
        status: "success", 
        info: "Submitted to FormSubmit fallback (spreadsheets setup pending)", 
        data: resData 
      });
    }
  } catch (error: any) {
    console.error("Error in /api/submit route handler:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
