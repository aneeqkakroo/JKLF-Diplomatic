// Diplomatic Bureau content. Kept in step with the main site's
// src/data/leadership.js (diplomaticBureau) and src/data/positions.js.

export const MAIN_SITE = "https://www.jklf.org";

export const bureau = {
  name: "Diplomatic Bureau",
  description:
    "The Diplomatic Bureau represents the Jammu Kashmir Liberation Front internationally. It maintains JKLF's relations with foreign governments, international organisations and the Kashmiri diaspora, and reports directly to the Central Committee.",
};

export const head = {
  role: "Head of Diplomatic Bureau",
  name: "Raja Zafar Khan",
  location: "Luton, United Kingdom",
  image: "/images/RajaZafarKhan.jpg",
  description:
    "Raja Zafar Khan heads the Diplomatic Bureau and represents JKLF internationally.",
};

// Members of the Diplomatic Bureau, listed with the Head under "Leadership".
export const members = [
  {
    role: "Secretary, Diplomatic Bureau",
    name: "Mahmood Hussain",
    image: "/images/MahmoodHussain.jpg",
  },
  {
    role: "Member, Diplomatic Bureau",
    name: "Tariq Shareef",
    image: "/images/TariqShareef.jpg",
  },
];

/*
  REPRESENTATIVES
  ---------------
  Add bureau members or country representatives here. The Bureau page lists
  them under the Head of Bureau; while the list is empty the section is hidden.
    { role: "Representative, Belgium", name: "Jane Doe", location: "Brussels", image: null }
*/
export const representatives = [];

// What the bureau does, by audience. Used on the home and bureau pages.
export const audiences = [
  {
    id: "governments",
    icon: "Landmark",
    title: "Governments & Diplomats",
    text: "We brief governments, parliaments and diplomatic missions on JKLF's position and the situation across the divided State of Jammu Kashmir.",
    action: "Request a meeting",
  },
  {
    id: "organisations",
    icon: "Scale",
    title: "UN, NGOs & Rights Bodies",
    text: "We raise the right of self-determination and human-rights concerns of the Kashmiri people with the United Nations and international organisations.",
    action: "Contact the bureau",
  },
  {
    id: "media",
    icon: "Newspaper",
    title: "Media & Press",
    text: "Official JKLF statements and press releases, and a point of contact for journalists seeking comment or interviews.",
    action: "Read statements",
    to: "/statements",
  },
  {
    id: "diaspora",
    icon: "Users",
    title: "Kashmiri Diaspora",
    text: "Wherever Kashmiris live, the freedom struggle is their duty. We connect the diaspora with JKLF's work abroad.",
    action: "Get in touch",
  },
];

// JKLF's position in brief, for an international reader. Wording follows the
// main site's "Our Position" page.
export const positionPoints = [
  {
    number: "01",
    title: "The Kashmir Question",
    text: "Not a territorial dispute between India and Pakistan, but the question of the national freedom and reunification of a forcibly divided state.",
  },
  {
    number: "02",
    title: "Self-Determination",
    text: "Only the people of Jammu Kashmir have the right to decide their constitution, their political system and their relations with other countries.",
  },
  {
    number: "03",
    title: "Political Settlement",
    text: "Reuniting the whole state as an independent, sovereign country, and an interim government of the liberated territories until then.",
  },
  {
    number: "04",
    title: "India and Pakistan",
    text: "We hold that no part of Jammu Kashmir is, constitutionally or legally, part of India, and that no part, including Azad Kashmir and Gilgit-Baltistan, is part of Pakistan.",
  },
  {
    number: "05",
    title: "A Democratic, Secular State",
    text: "Free elections, freedom of thought and expression, protection for every minority, and complete freedom for every citizen to practise their religion.",
  },
  {
    number: "06",
    title: "Our Case Before the World",
    text: "Presenting the Kashmir issue internationally as the national liberation struggle of the Kashmiri people, and winning global support for the sovereignty of the whole state.",
  },
];

export const documents = [
  {
    title: "Constitution of JKLF",
    description:
      "JKLF's aims, principles and organisational structure, including the Diplomatic Bureau. English, PDF.",
    href: "/documents/JKLF_Constitution_English.pdf",
    type: "PDF",
  },
  {
    title: "Our Position",
    description:
      "JKLF's full position on the Kashmir question, self-determination and a political settlement.",
    href: `${MAIN_SITE}/position`,
    type: "jklf.org",
  },
  {
    title: "History of the Movement",
    description:
      "The history of the Kashmiri freedom struggle and of JKLF since its founding.",
    href: `${MAIN_SITE}/history`,
    type: "jklf.org",
  },
  {
    title: "Leadership",
    description: "JKLF's current leadership, organisational zones and historical figures.",
    href: `${MAIN_SITE}/leadership`,
    type: "jklf.org",
  },
];

// Official JKLF social media accounts (same as the main site).
export const socialLinks = [
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/JKLF76/" },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/jklf_76/" },
  { id: "x", name: "X", url: "https://x.com/jklf_76" },
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/@JammuKashmirLiberationFront" },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@jklfofficial76" },
];

// Oxford Union debate (Bureau page, after Mandate). Photos are in
// public/images/oxford-debate (full size) and oxford-debate/thumbs.
export const oxfordDebate = {
  motion: "This House Believes in an Independent State of Kashmir",
  result: { ayes: 207, noes: 108 },
  text: "Raja Zafar Khan, Head of the Diplomatic Bureau, spoke for the motion at the Oxford Union, setting out the promises made to the people of Jammu Kashmir of a vote on their future and how they were broken. The House carried the motion.",
  video: {
    id: "i70xgVRckfo",
    title: "Zafar Khan details instances of India breaking promises to Kashmir for a vote on independence",
    channel: "Oxford Union",
  },
  photos: [6, 2, 1, 3, 4, 8, 11, 12, 9, 5, 10, 7].map((n) => {
    const file = String(n).padStart(2, "0");
    return {
      src: `/images/oxford-debate/${file}.jpg`,
      thumb: `/images/oxford-debate/thumbs/${file}.jpg`,
    };
  }),
};

// Diplomatic engagements of JKLF (Bureau page), latest first. Most come
// from yasinmalik.jklf.org/engagements/diplomatic; their photos are Getty
// Images, shown from Getty's servers as on that site, with credit. Own photos
// go in public/images/engagements and need no `credit`.
const getty = (id, path) => ({
  image: `https://media.gettyimages.com/id/${id}/photo/${path}`,
  credit: `https://www.gettyimages.com/detail/${id}`,
});

export const engagements = [
  {
    year: "2020",
    place: "Islamabad, Pakistan",
    title: "Secretary-General of the United Nations",
    with: "UN Secretary-General António Guterres",
    text: "JKLF Chief Spokesman Muhammad Rafiq Dar met UN Secretary-General António Guterres in Islamabad on 16 February 2020. He appealed that the people of Jammu Kashmir be left to decide their own fate, that a UN commission be sent to Jammu Kashmir, and that the UN play its role in the early release of Yasin Malik.",
    alt: "JKLF Chief Spokesman Muhammad Rafiq Dar shaking hands with UN Secretary-General António Guterres, 2020",
    image: "/images/engagements/2020-un-secretary-general.jpg",
  },
  {
    year: "2009",
    place: "Srinagar, Kashmir",
    title: "Ambassador of Belgium",
    with: "Jean M. Deboutte",
    text: "Belgium's Ambassador to India Jean Deboutte, a member of the same European Union delegation, met Yasin Malik in Srinagar on 24 November 2009.",
    ...getty(
      93348061,
      "jean-m-deboutte-ambassador-of-belgium-to-india-and-member-of-an-european-union-delegation-to.jpg?s=612x612&w=0&k=20&c=rD6PU8kaOybL7QtcekDYZO8OgEaFyX46AAs-ZVv-evc=",
    ),
  },
  {
    year: "2009",
    place: "Srinagar, Kashmir",
    title: "Ambassador of Sweden",
    with: "Lars-Olof Lindgren, Daniela Smadja",
    text: "Sweden's Ambassador to India Lars-Olof Lindgren, heading a European Union delegation, met Yasin Malik in Srinagar on 24 November 2009, during a two-day visit to meet pro-freedom leaders and officials.",
    ...getty(
      93347969,
      "lars-olof-lindgren-ambassador-of-sweden-to-india-and-head-of-an-european-union-delegation-to.jpg?s=612x612&w=0&k=20&c=epaPbdxNHhMoRC0MlI2eUtCqoYDoL4zNIaEXhruWJPk=",
    ),
  },
  {
    year: "2008",
    place: "Srinagar, Kashmir",
    title: "British High Commissioner",
    with: "Sir Richard Stagg",
    text: "British High Commissioner Sir Richard Stagg met Yasin Malik in Srinagar on 12 May 2008, while touring Kashmir to meet political leaders and human-rights activists.",
    ...getty(
      81057082,
      "british-high-commissioner-in-india-sir-richard-stagg-shake-hands-with-yasin-malik-chairman-of.jpg?s=612x612&w=0&k=20&c=4_ED-QhQV1BgK2-wi-uVhUAfHh6eyEDTvqwn8qpDWb8=",
    ),
  },
  {
    year: "2006",
    place: "Srinagar, Kashmir",
    title: "European Union Troika",
    with: "Asko Numminen, Francisco da Camara Gomes",
    text: "Finland's Ambassador Asko Numminen, then heading the EU presidency, and the European Commission's Ambassador Francisco da Camara Gomes met Yasin Malik in Srinagar on 18 September 2006, during the EU's annual fact-finding Troika visit.",
    ...getty(
      71913225,
      "head-of-the-european-union-and-ambassador-of-finland-asko-numminen-and-ambassador-of-the.jpg?s=612x612&w=0&k=20&c=34HA6MEaHhVmK35Bq18xwzdf01wArlSCWWQFMNlOQs0=",
    ),
  },
  {
    year: "2006",
    place: "New Delhi, India",
    title: "Prime Minister of India",
    with: "Prime Minister Manmohan Singh",
    text: "Yasin Malik met India's Prime Minister Manmohan Singh in New Delhi on 17 February 2006, a week ahead of the proposed roundtable talks on Kashmir.",
    ...getty(
      56869743,
      "indian-prime-minister-manmohan-singh.jpg?s=612x612&w=0&k=20&c=BzULUxceYG25OvOLjERVQPLnGibi30Llo7FlXkCn8hQ=",
    ),
  },
  {
    year: "2005",
    place: "Islamabad, Pakistan",
    title: "Prime Minister of Pakistan",
    with: "Prime Minister Shaukat Aziz",
    text: "Yasin Malik met Pakistan's Prime Minister Shaukat Aziz in Islamabad on 19 October 2005, after the earthquake that devastated both sides of Kashmir and brought new momentum to opening the dividing line.",
    ...getty(
      55955512,
      "pakistani-prime-minister-shaukat-aziz-listens-to-yasin-malik-head-of-the-jammu-kashmir.jpg?s=612x612&w=0&k=20&c=Bm5UzsJBtc16GiU3Yk8Hxf1aAOqCJhGutJL6_XxQey8=",
    ),
  },
  {
    year: "2004",
    place: "Srinagar, Kashmir",
    title: "Ambassador of the Netherlands",
    with: "Eric F. Ch. Niehe",
    text: "Netherlands Ambassador to India Eric Niehe, head of a five-member European Union delegation, met Yasin Malik in Srinagar on 28 September 2004, during a four-day visit to meet pro-freedom leaders and officials.",
    ...getty(
      51365138,
      "chairman-of-the-jammu-and-kashmir-liberation-front-yasin-malik-shakes-hands-with-the-head-of.jpg?s=612x612&w=0&k=20&c=HnbIx3XtBkfcJkux_UtE9H9cTBN7mxL8hP9x70nISDQ=",
    ),
  },
  {
    year: "2004",
    place: "Srinagar, Kashmir",
    title: "British High Commissioner",
    with: "Sir Michael Arthur",
    text: "British High Commissioner Sir Michael Arthur met Yasin Malik at his office in Srinagar on 25 March 2004, ahead of talks between the Hurriyat Conference and India's Deputy Prime Minister L. K. Advani.",
    ...getty(
      3131172,
      "srinagar-kashmir-india-british-high-commissioner-sir-michael-arthur-meets-with-jammu-and-kashmir.jpg?s=612x612&w=0&k=20&c=H2PQvPuWIlQzjQ14oScbdP1LevJQykDMmJ_p7u7Ftc8=",
    ),
  },
  {
    year: "1998",
    place: "Srinagar, Kashmir",
    title: "Ambassador of the United States",
    with: "William Celeste",
    text: "US Ambassador to India William Celeste met Yasin Malik in Srinagar on 20 October 1998, during his first fact-finding visit to Kashmir.",
    ...getty(
      2213577608,
      "american-ambassador-to-india-william-celeste-speaks-with-kahmiri-seperatist-leader-yasin.jpg?s=612x612&w=0&k=20&c=qtMwEhdGShKg3FyapkISM39v0mkXbgWvSwqYG8uCvv0=",
    ),
  },
];
