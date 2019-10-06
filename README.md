# aircnc omnistack

This project was developed in omnistack week 9 course.
Aircnc is a recreation of a service that provides an online
means to book a homestay. But in this case, instead of
homestay, we have coding spots. 

:warning: This is my version of the project, which is
different from the course.

## Printscreens

### Mobile 

<p align="center">
<img src="https://raw.githubusercontent.com/cleitondacosta/aircnc-omnistack/master/readme_files/MobileLogin.png" />
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/cleitondacosta/aircnc-omnistack/master/readme_files/MobileSpot.png" />
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/cleitondacosta/aircnc-omnistack/master/readme_files/MobileBooking.png" />
</p>


### Web

<p align="center">
<img src="https://raw.githubusercontent.com/cleitondacosta/aircnc-omnistack/master/readme_files/WebLogin.png" />
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/cleitondacosta/aircnc-omnistack/master/readme_files/WebSpot.png" />
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/cleitondacosta/aircnc-omnistack/master/readme_files/WebCreateSpot.png" />
</p>

## Features

- Backend: Node.JS.
- Web Frontend: React.
- Mobile: React Native.
- Real time booking notification with socket.io.
- Remote database.
- Image upload to backend with multer.
- react-native-cli (not Expo).

## External tools used in the development of this application:

- Insomnia.
- MongoDB Atlas.
- MongoDB Compass.

## Instalation (Linux)

First, make sure that you have yarn and git installed:

```
yarn --version
git --version
```

Then, clone this repo and cd into it:

```
git clone https://github.com/cleitondacosta/aircnc-omnistack.git
cd aircnc-omnistack
```

Now follow the next steps.

### Replace IP Address

Change my local IP address to yours.
(replace YOUR_IP by your local IP in the command below):

```
find ./*/src -name '*.js' -type f -exec sed -i 's/10.0.0.14/YOUR_IP/g' {} \;
```

### Backend

Enter into backend directory and install its dependencies:

```
cd backend
yarn
```

Create "uploads" directory:

```
mkdir uploads
```

Start the REST API:

```
yarn start
```

With this done, now you can run the frontend and mobile.

### Web Frontend

Enter into frontend directory and install its dependencies
(do not forget to cd into aircnc-omnistack before):

```
cd frontend
yarn
```

Run the React Development Server:

```
yarn start
```

Wait for the web application to open in your browser.

### Mobile

First, make sure that you have a properly configured 
smartphone or an emulator.

Enter into mobile directory and install its dependencies
(do not forget to cd into aircnc-omnistack before):

```
cd mobile
yarn
```

Install React Native:

```
yarn global add react-native-cli
```

Add ~/.yarn/bin to your PATH:

```
PATH="$PATH:$HOME/.yarn/bin"
```

Now you must install ANDROID SDK and put some of its 
directory into your PATH.
<a href="https://facebook.github.io/react-native/docs/getting-started.html">
See how to do it, under "React Native CLI Quickstart", on
topic "Android development environment."
</a>

Run the React Native Development Server:

```
cd ./mobile
yarn start
```

Now, in another terminal, run
(do not forget to cd into aircnc-omnistack before):

```
cd ./mobile
react-native run-android
```
