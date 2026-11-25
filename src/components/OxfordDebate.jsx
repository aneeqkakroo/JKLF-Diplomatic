import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Container, Section, SectionHeader } from "./ui";

export default function OxfordDebate({ debate }) {
  const { motion, result, text, video, photos } = debate;
  const [current, setCurrent] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);

  const step = (delta) =>
    setCurrent((index) => (index + delta + photos.length) % photos.length);

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  };

  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="Oxford Union" title="The Oxford Union debate" />

        <div className="debate">
          <div className="debate__summary">
            <p className="debate__motion">“{motion}”</p>
            <div className="debate__result" aria-label={`Result: Ayes ${result.ayes}, Noes ${result.noes}`}>
              <div>
                <strong>{result.ayes}</strong>
                <span>Ayes</span>
              </div>
              <div>
                <strong>{result.noes}</strong>
                <span>Noes</span>
              </div>
            </div>
            <p className="debate__carried">Motion carried</p>
            <p>{text}</p>
          </div>

          <div className="debate__video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <p className="debate__caption">
              {video.title}. Video: {video.channel}.
            </p>
          </div>
        </div>

        <h3 className="subheading">Photos from the debate</h3>
        <ul className="debate__gallery">
          {photos.map((photo, index) => (
            <li key={photo.src}>
              <button type="button" onClick={() => setCurrent(index)}>
                <img
                  src={photo.thumb}
                  alt={`Oxford Union debate, photo ${index + 1} of ${photos.length}`}
                  loading="lazy"
                  width="640"
                  height="426"
                />
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setCurrent(null)}
        onKeyDown={onKeyDown}
        onClick={(event) => event.target === event.currentTarget && setCurrent(null)}
        aria-label="Debate photo"
      >
        {current !== null && (
          <>
            <img
              src={photos[current].src}
              alt={`Oxford Union debate, photo ${current + 1} of ${photos.length}`}
            />
            <p className="lightbox__count">
              {current + 1} / {photos.length}
            </p>
            <button type="button" className="lightbox__close" onClick={() => setCurrent(null)} aria-label="Close">
              <X size={24} />
            </button>
            <button type="button" className="lightbox__prev" onClick={() => step(-1)} aria-label="Previous photo">
              <ChevronLeft size={28} />
            </button>
            <button type="button" className="lightbox__next" onClick={() => step(1)} aria-label="Next photo">
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </dialog>
    </Section>
  );
}
