import { useState, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { saveVideo } from "../../app/slices/questionsSlice.ts/questionsSlice";

const mimeType = 'video/webm; codecs="opus,vp8"';

export const MyRecorted = (props) => {
	const mediaRecorder = useRef(null);
	const liveVideoFeed = useRef(null);
	const interval = useRef(null);
	const [permission, setPermission] = useState(false);
	const [recordingStatus, setRecordingStatus] = useState("inactive");
	const [stream, setStream] = useState(null);
	const [recordedVideo, setRecordedVideo] = useState(null);
	const [videoChunks, setVideoChunks] = useState([]);
	const [recordingTime, setRecordingTime] = useState(0);
	const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);

	const dispatch = useAppDispatch()

	const getCameraPermission = async () => {
		setRecordedVideo(null);
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);

				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);
				liveVideoFeed.current.srcObject = videoStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("La api de MediaRecorte no es soportado por el navegador");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { mimeType });
		mediaRecorder.current = media;
		mediaRecorder.current.start();
		let localVideoChunks = [];
		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);

		interval.current = setInterval(() => {
			setRecordingTime((prevTime) => prevTime + 1);
		}, 1000);

		mediaRecorder.current.onstop = () => {
			clearInterval(interval.current);
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			setVideoChunks([]);
			setRecordingTime(0);
		};
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		setPermission(false);
		mediaRecorder.current.stop();
		clearInterval(interval.current);
		mediaRecorder.current.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);
			setRecordedVideo(videoUrl);
			setVideoChunks([]);
			setRecordingTime(0);
			setRecordedVideoUrl(videoUrl)

			stream.getVideoTracks().forEach((track) => {
				track.stop();
			});
		};
	};

	const pauseRecording = () => {
		setRecordingStatus("paused");
		mediaRecorder.current.pause();
		clearInterval(interval.current);
	};

	const resumeRecording = () => {
		setRecordingStatus("recording");
		mediaRecorder.current.resume();
		interval.current = setInterval(() => {
			setRecordingTime((prevTime) => prevTime + 1);
		}, 1000);
	};

	const formattedTime = new Date(recordingTime * 1000).toISOString().substr(11, 8);


	const handleSaveVideo = () => {
		dispatch(saveVideo({ index: props.index, videoUrl: recordedVideoUrl }))
	}

	return (
		<div className="w-[350px] grid gap-5 justify-items-center mx-auto">
			<div>

				<div className="video-controls">
					{!permission ? (
						<button
							className="btn btn-warning bg-yellow-500"
							onClick={getCameraPermission}
							type="button">
							{
								props.question.answered || recordedVideoUrl !== null ?
								"volver a grabar" : "Prender Cámara"
							}
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button
							onClick={startRecording}
							type="button"
							className="btn btn-primary bg-blue-500">
							Empezar grabación
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button
							onClick={stopRecording}
							type="button"
							className="btn btn-danger bg-red-500">
							Detener Grabación
						</button>
					) : null}
					{recordingStatus === "paused" ? (
						<button
							onClick={resumeRecording}
							type="button"
							className="btn btn-primary bg-blue-500">
							Reanudar grabación
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button
							onClick={pauseRecording}
							type="button"
							className="btn btn-warning bg-yellow-500">
							Pause Recording
						</button>
					) : null}
				</div>
				{recordingStatus !== "inactive" ? (
					<div className="video-timer">Recording time: {formattedTime}</div>
				) : null}
			</div>
			{recordingStatus === "recording" &&
				<span className="relative flex">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
				</span>
			}
			<div className="video-player">

				{!recordedVideo ? (
					<video ref={liveVideoFeed} autoPlay className="live-player"></video>
				) : null}
				{recordedVideo ? (
					<div className="recorded-player">
						<video className="recorded" src={recordedVideo} controls></video>
						<button
							onClick={handleSaveVideo}
							className="btn mt-3 btn-success">
							Guardar Video
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};

