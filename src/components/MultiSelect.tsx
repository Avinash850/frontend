// import React, { useEffect, useRef, useState } from "react";

// type Option = { id: number; name: string; [key: string]: any };

// type MultiSelectProps = {
//   label?: string;
//   options: Option[];
//   selected: number[]; // array of ids
//   onChange: (vals: number[]) => void;
//   placeholder?: string;
// };

// const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, selected, onChange, placeholder }) => {
//   const [open, setOpen] = useState(false);
//   const rootRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const onDocClick = (e: MouseEvent) => {
//       if (!rootRef.current) return;
//       if (!rootRef.current.contains(e.target as Node)) setOpen(false);
//     };
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);

//   const toggle = (id: number) => {
//     if (selected.includes(id)) onChange(selected.filter((v) => v !== id));
//     else onChange([...selected, id]);
//   };

//   const displayText = () => {
//     if (!selected || selected.length === 0) return placeholder || "Select";
//     const names = options.filter((o) => selected.includes(o.id)).map((o) => o.name);
//     return names.join(", ");
//   };

//   return (
//     <div className="relative" ref={rootRef}>
//       {label && <label className="block text-sm font-medium mb-1">{label}</label>}
//       <div
//         className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer"
//         onClick={() => setOpen((s) => !s)}
//         role="button"
//         tabIndex={0}
//       >
//         <div className={`${selected.length === 0 ? "text-gray-400" : "text-gray-800"}`}>{displayText()}</div>
//       </div>

//       {open && (
//         <div className="absolute z-40 mt-1 w-full bg-white border rounded-md shadow max-h-56 overflow-y-auto">
//           {options.map((opt) => (
//             <label
//               key={opt.id}
//               className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggle(opt.id);
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={selected.includes(opt.id)}
//                 onChange={() => {}}
//                 className="mr-2"
//                 readOnly
//               />
//               <span>{opt.name}</span>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiSelect;



import React, { useEffect, useRef, useState } from "react";

type Option = { id: number; name: string; [key: string]: any };

type MultiSelectProps = {
  label?: string;
  options: Option[];
  selected: number[];
  onChange: (vals: number[]) => void;
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((v) => v !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const displayText = () => {
    if (!selected.length) return placeholder || "Select";
    return options
      .filter((o) => selected.includes(o.id))
      .map((o) => o.name)
      .join(", ");
  };

  return (
    <div className="relative" ref={rootRef}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      {/* SELECT BOX */}
      <div
        className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setOpen((s) => !s)}
      >
        <span className={selected.length ? "text-gray-800" : "text-gray-400"}>
          {displayText()}
        </span>

        {/* DROPDOWN ICON */}
        <span className="text-gray-500 ml-2">
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* DROPDOWN LIST */}
      {open && (
        <div className="absolute z-40 mt-1 w-full bg-white border rounded-md shadow max-h-56 overflow-y-auto">
          {options.map((opt) => {
            const isChecked = selected.includes(opt.id);
            return (
              <div
                key={opt.id}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(opt.id); // ✅ click name OR checkbox works
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="mr-2"
                />
                <span>{opt.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
