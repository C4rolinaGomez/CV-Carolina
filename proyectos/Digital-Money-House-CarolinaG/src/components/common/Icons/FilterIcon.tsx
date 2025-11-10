type FilterIconProps = {
  className?: string;
};

export default function FilterIcon({ className }: FilterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="13"
      fill="none"
      className={className}
    >
      <path stroke="#052A2D" d="M0 9.7h17M17 2.767H0" />
      <circle cx="5.099" cy="9.633" r="2.333" fill="#0AEB8C" stroke="#052A2D" />
      <circle
        cx="11.901"
        cy="2.834"
        r="2.333"
        fill='#c1fd35'
        stroke="#052A2D"
        transform="rotate(-180 11.901 2.834)"
      />
    </svg>
  );
}
