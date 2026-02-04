# HTML Boilerplate

## Setup

### Prerequisites

You will need [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/) set up to manage your Node version, or alternatively be using the version of Node that is contained in the .nvmrc file.

You can also choose to run the project in Docker if you prefer. Instructions follow below.

### Starting a new project

Clone this repo, `cd` into the folder, run `nvm use` to switch to the proper node version for this project, and run `npm install`.

## Commands

`npm run dev` will spin up a localhost serving your pages from system memory. This means your files do not compile when you run this. Hot Module Replacement is set up by default, so development should be super fast.

`npm run build` will build your files for production. All of the minification, image compression, and compilation happens here. Your files will be output into the `/dist/` folder, which is the folder you should point Netlify to if you are pushing it up there, or this is the folder you should copy to a client's server if you are making it live somewhere else.

`npm run preview` this will load up your compiled files into the browser so you can see what has been compiled.

`npm run storybook` will spin up a localhost serving your storybook pages from system memory.

## Docker

If you choose to run the project in docker, you can download this repository and simply run `docker-compose up`. This will spin up a docker container running Node's image for version 18, and link your repo's working directory to the container so any changes made in this folder will reflect in your running Docker environment. The container only runs the `npm run dev` command by default.

## How it works

This boilerplate utilises Vite as a bundler. Rollup plugins can be used out of the box in Vite, so some of these are used as part of the build process - specifically to generate our responsive images.

The input file for the bundler is the src/index.html file (and any others you reference in the vite.config.js). This file has a the main.js file loaded, but notice there are no css files referenced in our input file.

Any of the pages you wish to include in the project should go inside the `/src/` folder inside a subfolder named with the page slug. We have a few example pages in there under `/free-ebook/` `/questionnaire/` and `/thank-you/`. Make sure to include the trailing slash in your urls when you are developing. These pages have basic layouts that utilise Bootstrap. Please remove any of these pages that are not in use from your final file.

Check out the features below for some info on how to embed inline SVGs, how to structure your image paths, and add new pages to your project.

## Prebuilt Components and Sections

The boilerplate comes with a few prebuilt components and sections that you can use in your project. You can preview these elements in one of two ways:

- Run `npm run storybook` and navigate to `localhost:6006` to see the library of prebuilt components and sections.

and/or

- Run `npm run preview` and navigate to `localhost:3000/sections` to see a page displaying all the prebuilt components and sections.

## Features

### TailwindCSS

We're using tailwind instead of writing plain CSS/SCSS or using bootstrap.

The tailwind docs can be found [here](https://tailwindcss.com/docs/).

#### Custom Tailwind Styles

By default Tailwind jit mode is enabled, so you can create your own custom classes on the fly.

If you need something super custom that tailwind doesn't provide out of the box, you can add a new class/value to **tailwind.config.js**.

Refer to the [official tailwind docs](https://tailwindcss.com/docs/) for the right syntax to use.

You will see some existing custom styles in there for the sections page.

### Automatic inline SVGs

Place your SVGs in the src/images folder, and reference your svg files like this `<icon src="FILENAME.svg"></icon>`. <ins>You don't need to reference the folder before your filename as this gets added by a Vite plugin.</ins> If for some reason you want to load your SVG like an image, you can just reference it as you would an image with an `<img>` tag. To load an SVG via an `<img>` tag, the SVG must be added to the /src/public folder eg. `<img src="svg-img.svg"/>`

### Automatic image processing

Place your images in the src/images folder, and reference your image files like this `<img src="FILENAME.png" />`. <ins>You don't need to reference the folder before your filename as this gets added by postHTML.</ins> The Vite plugin will wrap the `<img>` in `<picture>` tags and generate the corresponding .webp format image. It also applies height and width attributes to the image, and an empty alt attribute for any images that don't have one. Please make sure that any bitmap images (ie. not vectors) are exported at 2x size from the design.

To disable lazyloading for a specific image, add the attribute 'nolazy'- eg. `<img src="FILENAME.png" nolazy/>`

To disable image processing on a specific image - for example when using a gif - you can add the `skip` attribute to the image, eg. `<img src="FILENAME.gif" skip />` and the compiler should skip your image when building.

For more information on how the image processing works, see the [@kingkongdevs/vite-plugin-image-sizes](https://github.com/kingkongdevs/vite-plugin-image-sizes) docs.

### Adding new pages

In the vite.config.js file update the build.rollupOptions.input to include your additional HTML files. This will allow Vite to parse these in addition to the defaults. Additional pages can be accessed using a trailing `/`- so if you add `/thank-you`, in the browser it must be accessed via `localhost:3000/thank-you/`.

### Reusable Components

If you add a html file to the ./src/components folder, you can reuse it throughout your project by linking it in an <include> element like the below:

```html
<include src="yourfile.html"></include>
```

You can also pass custom variables to a component, like below:

```html
<include
	src="yourfile.html"
	locals='{
    "variable1" : "Some text",
    "variable2" : "Some other text"
}'
></include>
```

Then this would be output in the component like so:

```html
<include src="yourfile.html">
	<p>Some text</p>
	<p>Some other text</p>
</include>
```

This setup been used to create dummy T&Cs and Privacy Policies on the homepage.

Please see the readme for the @kingkongdevs/vite-plugin-html-includes package for more information on how these features work, and you can see an example on the `/sections/` page (unfortunately Storybook won't render these components at present).

### Form Handler & S3 Backup

Form submissions are processed by `/.netlify/functions/form-handler`, which sends leads to Salesforce and optionally backs up every submission to an S3 bucket.

**To enable S3 backup**, set these environment variables in Netlify (Site settings → Environment variables):

| Variable                       | Required                   | Description                                                                                                                                                                                                 |
| ------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `S3_BUCKET_NAME`               | Yes                        | Your AWS S3 bucket name                                                                                                                                                                                     |
| `ASSURE_AWS_ACCESS_KEY_ID`     | Yes                        | IAM user access key with `s3:PutObject` permission                                                                                                                                                          |
| `ASSURE_AWS_SECRET_ACCESS_KEY` | Yes                        | IAM user secret key                                                                                                                                                                                         |
| `ASSURE_AWS_REGION`            | No                         | **Must match the bucket’s region** (e.g. `us-east-1`, `ap-southeast-2`). Defaults to `ap-southeast-2`. If you see “bucket must be addressed using the specified endpoint”, set this to the bucket’s region. |
| `S3_ENDPOINT`                  | No                         | Optional. Override S3 endpoint (e.g. `https://s3.us-east-1.amazonaws.com`) if the bucket requires a specific endpoint.                                                                                      |
| `SUBMISSIONS_PASSWORD`         | Yes (for submissions page) | Password for `/submissions-login/` and listing submissions; set in Netlify (and in `.env` for local dev).                                                                                                   |

Submissions are stored as JSON files under `FormSubmissions/YYYY/MM/` in your bucket. Each file is named `YYYY-MM-DD_FirstName_shortId.json` for easy lookup (e.g. `2025-02-02_John_abc123.json`). If S3 credentials are not set, the backup is skipped and the form still works normally.

**Submissions admin page** (`/submissions/`): View all backed-up submissions. Uses a login blocker (similar to TotalProtectAssure): unauthenticated users are redirected to `/submissions-login/` to enter the password. Set `SUBMISSIONS_PASSWORD` in Netlify; sessions last 24 hours. Use "Log out" on shared devices.

### Form Validation

Add the class `kk-validation` to the form, and un-comment/add the lead library script to the bottom of the page `https://scripts.kingkong.net.au/tracker.min.js`.

Validation will work automatically assuming the correct `type` is set on each field, i.e. `text` for name, `email` for email addresses, `tel` for phone numbers.

Be sure to **NOT** include the large activecampaign script for validation, as this will interfere with the lead library and tracking.

With forms other than ActiveCampaign or Infusionsoft, this process will not apply.

### Custom Recapcha V3 For Forms

Add your own recaptcha v3 to our forms. The form must be using our custom validation, so the `kk-validation` class must be applied to the form. Here's how to set it up:

- Add `kk-recaptcha` class to the form.
- Create a new site/secret key pair in google's recaptcha console (inside the accounts@kingkong.com.au account)
- Put the site key in the data-recaptcha attribute on the script element:

`<script src="https://scripts.kingkong.net.au/tracker.min.js" data-recaptcha="XXXXXX_YOUR_RECAPTCHA_KEY_HERE_XXXXXX"></script>`

- Put the secret key in to the secret key field on the edit client page in the lead library

That's it!

Note:
If the client is deleted/made inactive, the endpoint will report all leads as valid. If the recaptcha account itself is deleted the form will throw an error & not submit.

## Packages Used

**@kingkongdevs/vite-plugin-image-sizes**

This is used to replace image tags with `<picture>` tags, generate `.webp` format images and image sizes and corresponding srcset attributes, adds height and width attributes to images, and adds an empty alt attribute to any images that don't have one.

**vite-plugin-compression**

Compresses assets generated by vite and assets from the public directory with Brotli, svgo, imagemin for pngs.

**tailwind**

A css class library, we use this instead of writing custom css.

**postcss**

Used to compile and purge tailwind.

**@kingkongdevs/vite-plugin-html-includes**

This plugin allows you to include HTML components in your project. It also allows you to pass variables to the component, and it will automatically replace the variables with the values you pass in.

**vite-plugin-posthtml**

This plugin allows post processing of the HTML generated by Vite.

**posthtml-inline-svg**

Replaces `<icon>` tags with svg src with inline svgs. See above section on how to use this.

**posthtml-plugin-picture-srcset**

This is a custom posthtml plugin that was started to process the HTML and output picture tags along with the image height and width attributes. Currently it only functions if clearing the dist folder is turned off, and the files already exist.

# Build Checklist

- **Delete unused pages** - Delete any pages that are not in use. If your project doesnt include an ebook, remove the `/src/free-ebook/` directory, and if it doesn't have a questionnaire, remove the `/src/questionnaire/` directory.

- **Thank you page** - Always include a thank you page. There is a template for this page located in the `/src/thankyou/` folder, please allow your CSS styles to apply to this page so it fits in with the design of the project we are building.

- **Validation:** - Make sure that the form is validating properly. Activecampaign scripts should be stripped entirely from the form (anything between the `<script>` tags) and Infusionsoft forms should have all `<script src="..."` tags removed except the `getTrackingCode`, `timezoneInputJs`, and `overwriteRefererJs` scripts. More information on implementing this can be found [here](#form-validation)

- **Opt in success message** - All opt in pages (the free-ebook and similar pages) should utilise the opt in success message built into the boilerplate. How to implement this is explained [here](#thank-you-message).

- **Remove unused scripts** - Any scripts that are not used in the project should be commented out so they do not compile with the rest of the JS. This can be done in the `/src/assets/js/main.js` file, by commenting out the import statement and the function that calls that item.

- **Upload ebook PDF** - If your project contains an opt in page, it should have a downloadable PDF that is uploaded to the project repository in the `/public/` folder. This will allow it to persist when the project is built. There is an example file in the `/public/free-ebook/ebook.pdf` folder. You can delete this `ebook.pdf` file and add the supplied PDF from the brief into this folder.

- **Include fonts locally** - When including fonts please convert the font file into woff and woff2 using a tool like [transfonter](https://transfonter.org), and importing the font using CSS. There is an example of how to include the font inside of the `/src/main.css` file.

    If you wish to use this font as a tailwind class (e.g font-gotham), you will need to add the font to both the main.css file AND the tailwind.config.js, according to [their docs](https://tailwindcss.com/docs/font-family#customizing-your-theme).

- **Only lazyload above the fold** - The `nolazy` attribute should only be added to images above the fold (images that are visible in the hero section when the page initially loads), and slider images (the slider has its own lazyloading). All other images should not have this attribute as it stops the image from being lazyloaded, thus reducing our load times.

---

# Lead Library

The lead library script should be included at the bottom of every page that contains a form.
This is the script:

```javascript
<script src="https://scripts.kingkong.net.au/tracker.min.js"></script>
```

## Classes & Utilities

You can add these classes to the `<form>` element to use different utilities:

- `kk-validation`
    - Adds form validation to all fields
    - Ensure the fields have the correct `[type]` and `[required]` attributes set.
- `kk-global`
    - Exposes a global JS function called `_sendToLeadLibrary()`
    - This function sends the lead to the lead library and fires dataLayer events as if the form had submitted normally.
    - Handy if the form doesn't redirect or fire "submit" events.

```javascript
let yourForm = document.querySelector('#your-form-id')
_sendToLeadLibrary(yourForm)
```

- `kk-showthankyou`
    - When the form is submitted it will store a variable in localStorage
    - If the opt-in page loads with this variable in localStorage the thankyou popup will appear
- `kk-nosend`
    - GTM Tracking will fire but it won't be saved in the lead library
- `disable-honeypot`
    - Will stop the lead library from adding the `<input name="planet"/>` honeypot
- `skip-lead-library`
    - The lead library won't process this form at all

### Input Field Classes

- `kk-novalidate`
    - Can be added to an email field to prevent the script from validating the email address
- `kk-numeric`
    - Can be added to a text input to only allow digits 0-9
- `kk-allow`
    - Overrides any ban protections and sends it to the lead library. Add this to the input field itself that's being banned.

### Contact Form 7

ContactForm7, if you include a hidden field with the name `kkredirect`, the lead library will wait for the "wpcf7mailsent" dom event from CF7, and redirect the form to the value of that hidden field.

### Form Messages

The following form messages can be overwritten, by adding a `<div>` with the class `.form-messages`.

Then a data attribute for each relevant message:

`data-success` - Successful form submit

`data-required` - When any required field is missed

`data-requiredfield` - Individual required field error

`data-invalidemail` - When email field is invalid

`data-invalidphone` - When phone field is invalid

e.g

```html
<div
	class="form-messages"
	data-success="Success Message"
	data-required="Please ensure all required fields have been completed."
></div>
```

# Calendly Integration

Open the booking/index.html file in your project.

Locate the Calendly script toward the bottom of the page. You'll see a section similar to the one below:

```html
<script>
	Calendly.initInlineWidget({
		url: '#Add calendly url here',
		parentElement: document.getElementById('calendly-widget'),
	})
</script>
```

Replace '#Add calendly url here' with your actual Calendly scheduling link. For instance, if your Calendly link is https://calendly.com/yourusername, the script should look like this:

```html
<script>
	Calendly.initInlineWidget({
		url: 'https://calendly.com/yourusername',
		parentElement: document.getElementById('calendly-widget'),
	})
</script>
```

# International Tel Input

To enable international telephone functionality, add the 'intl-phone' class to 'tel' input fields.

```html
<input
	type="tel"
	class="phone intl-phone"
	id="phone"
	name="phone"
	placeholder="Phone Number*"
	required
/>
```

To customize the countries displayed at the top, open the 'intl-tel-input.js' file and modify the 'preferredCountries' property's value.

```javascript
itiFields[index] = intlTelInput(el, {
	utilsScript:
		'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
	preferredCountries: ['au', 'us', 'ca', 'gb', 'nz'], // Add/Remove the country iso code.
	geoIpLookup: function (callback) {
		fetch('https://ipapi.co/json')
			.then(function (res) {
				return res.json()
			})
			.then(function (data) {
				callback(data.country_code)
			})
			.catch(function () {
				callback('au')
			})
	},
	hiddenInput: ogName,
	autoPlaceholder: 'aggressive',
})
```

Refer to the docs for more info on the package we are using for this.

https://github.com/jackocnr/intl-tel-input

# CrazyEgg

A crazyegg script is in the head section of every page, it looks like the script below.

This should be left here on every page unless you are asked explicitly to remove it.

```html
<script
	type="text/javascript"
	src="//script.crazyegg.com/pages/scripts/0000/0000.js"
	async="async"
></script>
```

# Project Launch Processes

[Check out the index of processes for launching a project here.](https://github.com/kingkongdevs/boilerplate/docs/index.md)

# Troubleshooting

## My project won't deploy for some reason

Run `npm run build` on your local machine. You should be able to replicate any build errors from the staging server on your local machine (1 in 100 times the problem is localised to Netlify and you should reach out for help to someone with access to the staging server logs).
