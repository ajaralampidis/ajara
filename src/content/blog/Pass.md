---
title: 'Pass, a password manager'
description: 'How I am using pass'
pubDate: 'Sep 18 2024'
# heroImage: '/blog-placeholder-1.jpg'
---

It's been some time since I been using [Pass](https://www.passwordstore.org/) and I want to write some notes on useful resources and how I am using.

# The Basics:

Pass its pretty simple at its core, it follows the UNIX philosophy so it focuses on only one thing: _managing passwords._

Pass its a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) tool that allows us to easily save and edit passwords in our filesystem.
This means that the passwords are going to be saved in the device we are using pass on. The thing is that pass encrypts the files for us:

> Each password lives inside of a gpg encrypted file whose filename is the title of the website or resource that requires the password.

Basically:

> All passwords live in `~/.password-store`, and pass provides some nice commands for adding, editing, generating, and retrieving passwords.
> ...
> It's capable of temporarily putting passwords on your clipboard and tracking password changes using git

# Setting it up

The [official website](https://www.passwordstore.org/) explain this perfectly well. But if you don't know much about encryption like me there is something important to understand:

Pass uses GPG to encrypt and decrypt the files. GPG keys are typically saved in `~/.gnupg/` directory. There you will have your public and private keyring respectively _(and other things too but lets keep this simple)_.

**Public keys are used to encrypt** data and can be shared. **Private keys are used to decrypt** data and shouldn't be shared. _(you share public keys so that anybody can encrypt and send you data, but only you can decrypt it)._

This is what its called **asymmetric encryption** and it is what pass uses to encrypt your password files. (GPG can also handle symmetric encryption, but as far as I know, pass uses asymmetric).

<details><summary><b class="text-xl cursor-pointer">Resources to understand dig deeper about encryption:</b></summary>

- A [quick video](https://www.youtube.com/watch?v=AQDCe585Lnc) to understand symmetric and asymmetric encryption
- An articles series to understand GPG and the concepts of hashes, digital signatures and symmetric, asymmetric encryption
  - [Part 1](https://tutonics.com/articles/gpg-encryption-guide-part-1/) _Core concepts_
  - [Part 2](https://tutonics.com/articles/gpg-encryption-guide-part-2-asymmetric-encryption/) _Using GPG for asymmetric encryption_
  - [Part 3](https://tutonics.com/articles/gpg-encryption-guide-part-3-digital-signatures/) _Digital Signatures_
  - [Part 4](https://tutonics.com/articles/gpg-encryption-guide-part-4-symmetric-encryption/) _Using GPG for symmetric encryption_
  </details>

So, before you run the `pass init "your GPG key ID"` command, you need to create a key-pair first. You can do that easily using `gpg --full-generate-key` _(there are plenty of guides out there, but the command its pretty straight forward)._ Just remember that GPG will save your keys in `~/.gnupg/`. Once created you can use: `gpg -k` to see your public keyring _(all your public keys)_ and select the one you want to use for pass. _(The id of the key can be the email you used for it or the string of random characters and numbers. Again there are lots of guides in internet to better understand this)_

### Backup:

GPG keys might or might not have an expiration date, but you can use GPG CLI to export your keys and back them up. This way you can backup both your GPG key and your pass files stored in `~/.password-store`.
Another useful thing is to initialize pass repo as a git repo. For this you can run `pass git init` and there you go. You can use all the git commands prefixing `pass ` before, so that you can keep track of all the changes of your passwords.

# Sync with Android:

Pass itself its just a CLI. But the community has developed [other clients and GUIs for different platforms](https://www.passwordstore.org/#other). In my linux desktop I like to use [QtPass](https://qtpass.org/) and for Android we can use [Android Password Store](https://passwordstore.app/). But unfortunately this is not _so_ straight forward.

Remember that **pass runs on your local filesystem**, so your phone has no way to automatically sync with your pc pass. You could copy both your gpg keys and your passwords manually to your phone but keeping them both in sync would be a hassle. What I recommend doing is setting your pc as a localhost git server so that your phone can pull & push changes _(thankfully passwordstore helps us pretty much follow this strategy)_.

## Localhost Git Server on your desktop:

We are going to allow ssh connections to our machine, and we are going to setup a git bare repo to allow pulling and pushing changes to it.

### SSH Connections:

- In Linux to allow incoming ssh connections you need to install `openssh-server` _(sudo apt install or sudo dnf install will do the job)_.
- Then you need to start the service. `systemctl start sshd` will start your service but we can also use `systemctl enable sshd` so that is starts when we power-on our machine.
  - To better understand what we are doing you need to know that systemctl is the CLI that most Linux distros uses to manage the systemd system and service manager. You can google that if you need to.
- Once we have our ssh server running _(you can check that with `sudo systemctl status sshd` and see that it is active)_, you will be able to connect from other device using: ssh@[username][yourserevr IP address]
  - username → is the linux user you want to connect as. (It will probably ask you for the user's password to allow the connection)
  - yourserevr IP address → its your localhost IP address. (You can find it using `ifconfig` and looking for the number that starts with 192.168...)
  - You will be able to connect through your local network. Connecting from anywhere else would require us to configure our internet router to allow that. _(This way is safer and I have never found the need for remote access yet)_.

- Now our ssh server is working but we can improve safety by allowing connections only with ssh keys, and disallowing connections with password.
  - For this we will create an ssh key `ssh-keygen` this will create two files in our `~/.ssh/` directory. The one ending with .pub is the public one and we are going to copy its contents in `~/.ssh/authorized_keys` file. This file is used by default by our ssh server to validate connections via ssh keys. And then we'll need to copy our private key into our phone. _(We could also make the key directly in our phone using passwordstore and then copying the contents of the .pub key in our pc)_
    - _Btw, ssh keys works very similar to GPG keys, but they are simpler and the keys are stored as simple files. Usually saved in `~/.ssh/` directory._

  - Disallowing password connections is as simple as editing the file: `/etc/ssh/sshd_config` and changing PasswordAuthentication yes to no.

### Git bare repo:

Now that our phone can connect via ssh to our pc, we need to create our git bare repo to allow pushing and pulling from it.

- Since pass saves everything in `~/.password-store` we can create our bare git in a new directory in `~/.password-store.git` (you can name it differently or place it anywhere you want).
- We are going to move inside that new directory and run `git init --bare`. And that all we need to with our bare repo.
- We then need to move into `~/.password-store` and set our bare repo as the remote repo: `git remote add <name> ~/.password-store.git`
  - _The command sample assumes your bare repo is where its mine._
- If everything went fine, we should be able to run git push (or git push <name>) and it should be able to push into our bare repo.

### Android Setup:

Now we need to setup our android:

- First we need to export our GPG keys so that our phone can encrypt and decrypt passwords.
  - For this we can use `gpg --list-secret-keys` to see the secret keys we are using. We need to locate the one we use for pass and copy its id.
  - Then we can run `gpg --export-secret-keys -a <key id> > ~/Desktop/gpg_key_file_name` to export our **secret** gpg key into a file in our desktop.
  - And run `gpg --export -a <key id> > ~/Desktop/gpg_key_file_name.pub` to do the same for our **public** key.
  - Finally you need to transfer those to your phone. Do it through a secure mechanism, I just connected my phone through the usb port. Try to avoid internet transfer.
  - Remember to also transfer your ssh private key. **The ssh key will be used to connect via ssh, and the gpg will be used to encrypt and decrypt your passwords**
- Once that is done, in your phone you will need to install [OpenKeychain](https://www.openkeychain.org/) which will help you manage your gpg keys.
  - In OpenKeychain import the key from the file you just transferred.
- In password store you will need to setup both your GPG keys and your git server.
  - For the GPG its very simple, you just need to select the key that should be already imported in OpenKeychain. (Passwordstore uses OpenKeychain to manage keys).
    - _I don´t remember exactly this step. But I think you don´t even need to set this up. Passwordstore will automatically use the keys imported in OpenKeychain_
  - For the git server, you will need to select you ssh key. The repository url its going to be <your linux user>@<your private ip>:password-store.git And the branch will probably be master.
- If everything went well, you should be able to sync, pull and push changes to your repo from your phone (if you are no the same local network). Remember that you will also need to pull and push from pass. You could automate this with a script and a git-hook, but I prefer the manual route here just because it makes me feel more in control.

# A Final Note

If you _just_ want a password manager and don't want to worry about a single thing, then this setup its not for you.

There are pretty good free options like [BitWarden](https://bitwarden.com/), [Passky](https://passky.org/), [KeePass](https://keepass.info/)/[KeePassXC](https://keepassxc.org/) or [ProtonPass](https://proton.me/pass). And other premium ones like [1Password](https://1password.com/).

For me learning how to use and configure pass was something I found interesting and rewarding. I had never configured a git server before and my ssh and GPG knowledge was the bare minimum. I know this its not a flashy project, but I had a great time setting and understanding all this up.

# External resources:

Using pass its not hard once you get used to it. But these resources helped me a lot to understand it when I started to use it:

- [Pass website](https://www.passwordstore.org/) and [Pass MAN](https://git.zx2c4.com/password-store/about/)
- [Video: Pass Basics](https://www.youtube.com/watch?v=FhwsfH2TpFA)
- [Video: Pass and Keybase](https://www.youtube.com/watch?v=8_L6XljCZzA)
- [Video: Pass for iOS! Using Git and SSH](https://www.youtube.com/watch?v=2Ji7Ph8atus)
- [Video: Setting Up the Password Store (Pass) App to Work with Android 13+](https://www.youtube.com/watch?v=6Qv_X-AmskI)
- [Video: Git Server](https://www.youtube.com/watch?v=ju9loeXNVW0)
