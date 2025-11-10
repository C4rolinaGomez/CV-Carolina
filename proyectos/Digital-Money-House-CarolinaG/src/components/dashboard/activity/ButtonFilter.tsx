"use client";
import FilterIcon from "@/components/common/Icons/FilterIcon";
import PeriodFilter from "./PeriodFilter";

type ButtonFilterProps = {
  onClick?: () => void;
  showFilterPanel: boolean;
  onApply: (value: string) => void;
  onClear: () => void;
  setShowFilterPanel: (value: boolean) => void;
};

const ButtonFilter = ({ onClick, showFilterPanel, setShowFilterPanel, onApply, onClear }: ButtonFilterProps) => {

  return (
    <>
      <div className=" relative md:rounded-[10px] md:p-5  md:bg-green md:shadow-md">
        <button className="gap-3 md:gap-16 flex justify-between items-center"
          onClick={onClick}>
          <span className="text-black underline decoration-1 md:no-underline text-base font-semibold md:font-bold">Filtrar</span>
          <FilterIcon
          className="items-center" />
        </button>
      </div>

      {showFilterPanel && (
        <PeriodFilter
        onApply={(value) => {
          onApply(value);
          setShowFilterPanel(false); // cerrar panel al aplicar
        }}
        onClear={() => {
          onClear();
          setShowFilterPanel(false); // cerrar panel al borrar
        }}
        />
      )}
    </>
  );
};

export default ButtonFilter;
