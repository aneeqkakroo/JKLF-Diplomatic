import { Link } from "react-router-dom";
import { ArrowRight, MapPin, UserRound } from "lucide-react";

import AudienceIcon from "../components/AudienceIcon";
import Engagements from "../components/Engagements";
import OxfordDebate from "../components/OxfordDebate";
import PageHeader from "../components/PageHeader";
import { Container, Section, SectionHeader } from "../components/ui";
import { audiences, bureau, engagements, head, members, oxfordDebate, representatives } from "../data/bureau";
import useDocumentTitle from "../lib/useDocumentTitle";

function Person({ person, large = false }) {
  return (
    <article className={`person ${large ? "person--large" : ""}`}>
      {person.image ? (
        <img src={person.image} alt={person.name} />
      ) : (
        <div className="person__placeholder" aria-hidden="true">
          <UserRound size={40} />
        </div>
      )}
      <div>
        <span className="ui-eyebrow">{person.role}</span>
        <h3>{person.name}</h3>
        {person.location && (
          <p className="person__location">
            <MapPin size={15} aria-hidden="true" /> {person.location}
          </p>
        )}
        {person.description && <p>{person.description}</p>}
      </div>
    </article>
  );
}

export default function Bureau() {
  useDocumentTitle("The Bureau");

  return (
    <>
      <PageHeader eyebrow="The bureau" title={bureau.name} lead={bureau.description} />

      <Section>
        <Container>
          <SectionHeader eyebrow="Leadership" title="Bureau leadership" />
          <Person person={head} large />

          {members.length > 0 && (
            <div className="people-grid people-grid--members">
              {members.map((person) => (
                <Person key={person.name} person={person} />
              ))}
            </div>
          )}

          {representatives.length > 0 && (
            <>
              <h2 className="subheading">Representatives</h2>
              <div className="people-grid">
                {representatives.map((person) => (
                  <Person key={`${person.role}-${person.name}`} person={person} />
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      <Section variant="soft">
        <Container>
          <SectionHeader
            eyebrow="Mandate"
            title="Who we work with"
            description="The bureau is separate from JKLF's zones and reports directly to the Central Committee."
          />
          <div className="audience-grid">
            {audiences.map((item) => (
              <article key={item.id} className="audience-card">
                <AudienceIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="text-link" to={item.to || `/contact?as=${item.id}`}>
                  {item.action} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <OxfordDebate debate={oxfordDebate} />

      <Engagements items={engagements} />
    </>
  );
}
