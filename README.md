# Jetscreen
![](https://github.com/oliverrees/jetscreen/blob/main/screendemo.gif)

If you live on a flight path or often have planes flying overhead, you might wonder where in the world they've come from. Jetscreen uses live ADS-B data to identify planes flying overhead, and then looks up the origin via the [adsbdb API](https://www.adsbdb.com/).

## Requirements
To run Jetscreen, you'll need the following hardware:
- A Raspberry Pi (tested on a 3B+)
- A monitor (the demo uses [WaveShare's 7.9in display](https://www.waveshare.com/wiki/7.9inch_HDMI_LCD))
- A USB ADS-B receiver (the demo uses the [FlightAware Pro Stick Plus](https://uk.flightaware.com/adsb/prostick/))

### 1. Set up the Raspberry Pi
Ensure your Raspberry Pi is configured with an operating system like Raspbian, and connected to a monitor and keyboard. You'll also need an internet connection via Wi-Fi or Ethernet.

First, update the system by running:
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Setup ADS-B Receiver
Follow the instructions for your specific USB ADS-B receiver (like the [FlightAware Pro Stick Plus](https://uk.flightaware.com/adsb/prostick/)) to install the required software. This should expose a local URL where you can access the live ADS-B data stream (for the FlightAware Pro Stick Plus, it's `http://[local IP]:8080/data/aircraft.json`).


### 3. Install Node.js and npm
Jetscreen is built on Next.js, which requires Node.js and npm to run. Install them using the following commands:

```bash
sudo apt install nodejs npm -y
```

To verify the installation:
```bash
node -v
npm -v
```

Ensure you have the latest versions.

### 4. Clone the Jetscreen Repository
Clone the **Jetscreen** repository from GitHub:

```bash
git clone https://github.com/oliverrees/jetscreen-v2.git
```

Navigate into the project folder:
```bash
cd jetscreen-v2
```

### 5. Install Dependencies
Run the following command to install the necessary packages:

```bash
npm install
```

### 6. Create the `.env.local` File
Inside the root directory of the project, create a `.env.local` file to store environment variables:

```bash
touch .env.local
```

Edit this file to include the following variables:
```bash
LOCAL_ADSB_URL=http://192.168.1.100:8080/data/aircraft.json
NEXT_PUBLIC_FLIGHT_DETAILS_URL=https://api.adsbdb.com/v0/callsign/
NEXT_PUBLIC_CENTER_LAT=51.47674088740635
NEXT_PUBLIC_CENTER_LON=-0.23339838187103154
NEXT_PUBLIC_RADIUS_KM=2
NEXT_PUBLIC_LOCAL_AIRPORT_CODES=YVR,YYX
```

#### Explanation of Environment Variables:
- `LOCAL_ADSB_URL`: The URL of your local ADS-B data stream (replace with your actual IP and port).
- `NEXT_PUBLIC_FLIGHT_DETAILS_URL`: The adsbdb API URL to fetch flight details by callsign - [hexdb.io](https://hexdb.io) is another option.
- `NEXT_PUBLIC_CENTER_LAT`: The latitude of the center point of the map where you're tracking planes (replace with your location).
- `NEXT_PUBLIC_CENTER_LON`: The longitude of the center point (replace with your location).
- `NEXT_PUBLIC_RADIUS_KM`: The radius (in kilometers) for which you want to track planes around your center point.
- `NEXT_PUBLIC_LOCAL_AIRPORT_CODES`: (Optional) The IATA codes for the local airports near you, as a comma separated list. If the flight origin is your local airport's IATA code, the Destination information will be displayed instead.

### 7. Start the Development Server
To start the server in development mode, run the following command:

```bash
npm run dev
```

This will start the server, and you can view Jetscreen by navigating to `http://localhost:3000` in your browser.

### 8. Optional: Run Jetscreen in Production
For production mode, first build the app:

```bash
npm run build
```

Then, start the production server:

```bash
npm start
```

Now, you can access Jetscreen from any device on the same network by navigating to the Raspberry Pi's IP address and port `3000` in a browser.


### 9. Set up the browser on the Raspberry Pi
To run Jetscreen in full-screen mode on the Raspberry Pi, you can use a browser like Chromium. Install it using the following command:

```bash
sudo apt install chromium-browser -y
```

To open Jetscreen in full-screen mode, run:

```bash
chromium-browser --kiosk http://localhost:3000
```






