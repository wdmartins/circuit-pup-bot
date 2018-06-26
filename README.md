# circuit-monas-bot

## What will you need?
* A Raspberry PI 3
* A SD Card (16GB recommended)
* USB Keyboard
* USB Mouse
* HDMI Monitor
* USB WebCam with microphone
* Speakers with 3.5mm jack

## Setting up your Raspberry PI 3

* Connect all devices to your Raspberry PI (Keyboard, Mouse, Monitor, USB WebCam, and Speakers)
* Install Raspbian on the SD Card. Instructions [here](https://projects.raspberrypi.org/en/projects/noobs-install)

### Enable VNC and SSH to control the Raspberry PI 3 from other devices (Optional)

#### Make sure you have the latest version of VNC

On your Raspberry console:

    sudo apt-get update  
    sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer

#### Enable VNC

On your Raspberry Pi, boot into the graphical desktop.

    Select Menu > Preferences > Raspberry Pi Configuration > Interfaces.  
    Ensure VNC and SSH are Enabled.  

### Configure and Test Audio Devices

On your Raspberry console:
    
1.  Find your recording and playback devices  
  *  Locate your USB microphone in the list of capture hardware devices. Write down the card number and device number.  
  
         arecord -l  

  *  Locate your speaker in the list of playback hardware devices. Write down the card number and device number. Note that the 3.5mm-jack is typically labeled Analog or bcm2835 ALSA (not bcm2835 IEC958/HDMI).  
   
         aplay -l  

2.  Create a new file named .asoundrc in the home directory (/home/pi). Make sure it has the right slave definitions for microphone and speaker; use the configuration below but replace <card number> and <device number> with the numbers you wrote down in the previous step. Do this for both pcm.mic and pcm.speaker.  
    
        pcm.!default {
          type asym
          capture.pcm "mic"
          playback.pcm "speaker"
        }
        pcm.mic {
          type plug
          slave {
            pcm "hw:<card number>,<device number>"
          }
        }
        pcm.speaker {
          type plug
          slave {
            pcm "hw:<card number>,<device number>"
          }
        }
    
3.  Verify that recording and playback work:  

  *  Adjust playback volume  
  
         alsamixer
    
  Press the up and down arrow to set the playback to the desired volume (70% or less recomemended for headsets)
   
  *  Play test sound. Press Ctrl-C when done. If you do not hear anything check your speaker or headset connections.
  
         speaker-test -t wav
    
  If you still do not hear anything and you have an HDMI monitor connected you need to force the audio output to your speakers or headset. Do the following:
    
       sudo raspi-config
    
  Go to "Advance Options-> Audio" and select "Force 3.5mm ('headphone') jack
  
  *  Record some audio
  
         arecord --format=S16_LE --duration=5 --rate=16000 --file-type=raw out.raw
      
  *  Check the recording by replaying it
  
         aplay --format=S16_LE --rate=16000 out.raw
      
      
### Change default password (Optional but recommended)

On your Raspberry Pi graphical desktop.

    Select Menu > Preferences > Raspberry Pi Configuration -> System -> Change Password  
    Enter and confirm new password.

### Share Raspberry Pi file system with windows using samba (Optional)

Follow instructions [here](https://raspberrypihq.com/how-to-share-a-folder-with-a-windows-computer-from-a-raspberry-pi/)

### Update nodejs to latest version

    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -  
    sudo apt install nodejs

### Install headless Chrome Node library Puppeteer

    npm i --save puppeteer

## Setup the application

  ####  Clone this repo  

          git clone https://github.com/wdmartins/circuit-pup-bot.git
      
      
  ####  Install the application  
  
          npm install


  ####  [Register an account](https://www.circuit.com/web/developers/registration) on circuitsandbox.net
  
  ####  [Register a bot](https://circuit.github.io/oauth) on the sandbox (OAuth 2.0 Client Credentials)
  
  ####  Create the config.json file  
  
          cp config.template.json config.json
  
  ####  Edit config.json file and complete all fields accordingly
  
  #### Using Circuit client to create a Circuit Bridge Conversation, add the bot user seaching the email address provided when registering your bot.
      
## Run the application

  ####  Production mode
  
    npm start

  ####  Debug mode
    
    npm run dev
