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
  major: string;
  year: string;
  quote: string;
  image: string;
};

export const currentMembers: TeamMember[] = [
  {
    name: "Kelly",
    major: "Computer Science",
    year: "Senior",
    quote: "I don’t get paid enough for this.",
    image: member01,
  },
  ...[
    member02,
    member03,
    member04,
    member05,
    member06,
    member07,
    member08,
    member09,
    member10,
  ].map((image, index) => ({
    name: `Team member ${index + 2}`,
    major: "Profile coming soon",
    year: "Current member",
    quote: "More about this team member is coming soon.",
    image,
  })),
];

export const pastMembers: TeamMember[] = [];
