import member01 from "../../assets/team/member-01.png";
import member02 from "../../assets/team/member-02.png";
import member03 from "../../assets/team/member-03.png";
import member04 from "../../assets/team/member-04.png";
import member05 from "../../assets/team/member-05.png";
import member06 from "../../assets/team/member-06.png";
import member07 from "../../assets/team/member-07.png";
import member08 from "../../assets/team/member-08.png";
import member09 from "../../assets/team/member-09.png";
import member10 from "../../assets/team/member-10.png";

export type TeamMember = {
  name: string;
  role?: string;
  major?: string;
  year?: string;
  tenure?: string;
  quote?: string;
  linkedinUrl?: string | null;
  discordUrl?: string | null;
  image: string;
};

const kelly: TeamMember = {
  name: "Kelly Lin",
  major: "Computer Science",
  year: "Senior",
  quote: "I don’t get paid enough for this.",
  image: member01,
};

const erina: TeamMember = {
  name: "Erina",
  image: member02,
};

const guan: TeamMember = {
  name: "Guan",
  image: member03,
};

const sabrina: TeamMember = {
  name: "Sabrina",
  image: member04,
};

const maggie: TeamMember = {
  name: "Maggie",
  image: member05,
};

const tahya: TeamMember = {
  name: "Tahya",
  image: member06,
};

const fariha: TeamMember = {
  name: "Fariha Kha",
  image: member07,
};

const mamota: TeamMember = {
  name: "Mamota",
  image: member08,
};

const anthony: TeamMember = {
  name: "Anthony",
  image: member09,
};

const kyle: TeamMember = {
  name: "Kyle",
  image: member10,
};

export const currentMembers: TeamMember[] = [tahya, fariha];

export const pastMembers: TeamMember[] = [
  kelly,
  erina,
  guan,
  sabrina,
  maggie,
  mamota,
  anthony,
  kyle,
];
