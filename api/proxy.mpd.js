export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const originalMPD = 'https://linearjitp-playback.astro.com.my/dash-wv/linear/5066/default_ott.mpd';

  const response = await fetch(originalMPD);
  const xml = await response.text();

  const modifiedXML = xml.replace('</AdaptationSet>', `
    <Representation id="1080p" bandwidth="5000000" width="1920" height="1080" frameRate="25" codecs="avc1.640028" mimeType="video/mp4" startWithSAP="1">
    </Representation>
  </AdaptationSet>`);

  return new Response(modifiedXML, {
    headers: { 'Content-Type': 'application/dash+xml' }
  });
}
