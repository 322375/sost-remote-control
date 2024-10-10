import { useEffect } from "react";
import { peer, getScreenStream } from "./peer-control";

function play(stream) {
  try {
    let video = document.getElementById("screen-video");
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    }
  } catch (err) {
    console.error(err);
  }
}

peer.on("add-stream", (stream) => {
  console.log("add-stream")
  play(stream);
})

function VedioControl(): JSX.Element {
  
  useEffect(() => {
    getScreenStream()
  }, [])
  
  return (
    <>
      <h1>Sost Remote Control</h1>
      <video id='screen-video'></video>
    </>
  )
}

export default VedioControl