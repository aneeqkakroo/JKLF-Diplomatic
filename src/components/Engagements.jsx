import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import { Container, Section, SectionHeader } from "./ui";

export default function Engagements({ items }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const goTo = (index) => {
    const track = trackRef.current;
    const target = Math.max(0, Math.min(items.length - 1, index));
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    }
  };

  return (
    <Section variant="soft">
      <Container>
        <SectionHeader
          eyebrow="Engagements"
          title="Diplomatic engagements of JKLF"
          description="Meetings of JKLF's leadership with the United Nations, heads of government, ambassadors and international delegations."
        />

        <div className="engagements">
          <div
            ref={trackRef}
            className="engagements__track"
            onScroll={onScroll}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Diplomatic engagements"
          >
            {items.map((item, index) => (
              <article
                key={item.image}
                className="engagement"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}: ${item.title}`}
              >
                <figure className="engagement__photo">
                  <img
                    src={item.image}
                    alt={item.alt || `Yasin Malik with ${item.with}, ${item.year}`}
                    loading="lazy"
                    width="612"
                    height="408"
                  />
                  {item.credit && (
                    <figcaption>
                      <a href={item.credit} target="_blank" rel="noreferrer">
                        Photo: Getty Images
                      </a>
                    </figcaption>
                  )}
                </figure>
                <div className="engagement__body">
                  <p className="engagement__meta">
                    <span className="engagement__year">{item.year}</span>
                    <span>
                      <MapPin size={15} aria-hidden="true" /> {item.place}
                    </span>
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <p className="engagement__with">
                    <strong>With:</strong> {item.with}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="engagements__controls">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous engagement"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="engagements__dots">
              {items.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  className={index === active ? "is-active" : ""}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${index + 1}: ${item.title}, ${item.year}`}
                  aria-current={index === active ? "true" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === items.length - 1}
              aria-label="Next engagement"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
