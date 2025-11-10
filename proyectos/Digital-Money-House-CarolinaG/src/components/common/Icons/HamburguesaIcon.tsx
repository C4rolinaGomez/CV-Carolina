"use client"
type HamburguesaIconProps = {
  className?: string;

};

const HamburguesaIcon = ({ className }: HamburguesaIconProps) => {
  return (
      <svg
        width="33"
        height="26"
        viewBox="0 0 33 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className= {className}
      >
        <line
          x1="2"
          y1="2"
          x2="31"
          y2="2"
          stroke="#c1fd35"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="2"
          y1="13"
          x2="31"
          y2="13"
          stroke="#c1fd35"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="2"
          y1="24"
          x2="31"
          y2="24"
          stroke="#c1fd35"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
  );
};

export default HamburguesaIcon;
