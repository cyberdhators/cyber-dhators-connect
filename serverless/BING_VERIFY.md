Bing Webmaster - Host verification key file (quick steps)

This project includes a small helper to create the verification file Bing requires.

1) Get the key from Bing Webmaster
   - In Bing Webmaster, when you choose "Host your API key" it will give you a key and ask you to host a UTF-8 text file at the root of your site, e.g. `https://cyberdhators.codes/<KEY>.txt`.

2) Create the verification file locally
   - From the repo root run (replace KEY with the value Bing gave you):

     ```powershell
     node .\scripts\create-bing-key.js YOUR_KEY_HERE
     ```

   - Or set the env var and run the script:

     ```powershell
     $env:BING_KEY = "YOUR_KEY_HERE"; node .\scripts\create-bing-key.js
     ```

   - The script writes `public/<KEY>.txt` containing the key text.

3) Deploy the site
   - Deploy the site so the file is available at `https://cyberdhators.codes/<KEY>.txt`.
   - If you're using a static host (Vercel, Netlify), the `public/` folder is served from the site root so the file will be accessible automatically after deploy.

4) Verify in Bing Webmaster
   - Use the "Verify" step in Bing Webmaster. If the file is accessible and contains the key, verification should pass.

Notes and alternatives
- If you cannot redeploy, you can host the text file on any path within the same host and point Bing to it using the key location option.
- For automated CI deployments you can add a pipeline step to write the verification file using the supplied key (use secrets in your host to store the KEY).

If you want, I can:
- Add a dynamic route to serve the key from the app (not recommended for static hosting), or
- Create a Netlify/Vercel-specific example for hosting the file as part of build/deploy.
