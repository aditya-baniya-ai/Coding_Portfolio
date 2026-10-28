import Image from "next/image";
import type { Project } from "@/lib/projects";

/** Illustrated artwork for projects without photos or screenshots. */
export default function ProjectArt({ project }: { project: Project }) {
  if (project.id === "sentinel")
    return (
      <div
        className="pipeline-art"
        aria-label="PPE detection pipeline: camera input, YOLOv8 with CBAM, TensorRT edge inference"
      >
        <div className="scan-field">
          <div className="scan-cross cross-one" />
          <div className="scan-cross cross-two" />
          <div className="scan-box">
            <span>PPE DETECTION</span>
            <div className="scan-points">
              {Array.from({ length: 24 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <b>VISION → ACTION</b>
          </div>
        </div>
        <div className="pipeline-steps">
          <span>CAPTURE</span>
          <i>→</i>
          <span>YOLOv8 + CBAM</span>
          <i>→</i>
          <span>TENSORRT</span>
        </div>
      </div>
    );
  if (project.id === "reelstudio")
    return (
      <div
        className="reel-art"
        aria-label="ReelStudio pipeline: photos, vision agents, cinematic reels"
      >
        <div className="reel-word">
          reel<span>studio</span>
          <sup>↗</sup>
        </div>
        <div className="reel-timeline">
          {[
            34, 48, 72, 46, 89, 63, 42, 79, 100, 62, 39, 78, 49, 91, 57, 37, 68,
            46, 82, 54, 34, 73, 96, 63, 45, 82, 55, 69, 42, 87,
          ].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="reel-caption">
          <span>PHOTOS → AGENTS → FILM</span>
          <span>ON THE BEAT.</span>
        </div>
      </div>
    );
  return (
    <div className="project-image">
      <Image
        src={project.image!}
        alt={`${project.title} project screenshot`}
        fill
        sizes="(max-width: 720px) 100vw, 50vw"
      />
    </div>
  );
}
