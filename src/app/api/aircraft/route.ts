import { NextResponse } from "next/server";
export const revalidate = 0;
const API_URL = process.env.LOCAL_ADSB_URL || "";

export async function GET() {
  try {
    // Fetch data from the external API
    const response = await fetch(API_URL);

    // Handle unsuccessful requests
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch aircraft data" },
        { status: response.status }
      );
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Return the data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
