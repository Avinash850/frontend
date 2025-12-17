import ReactQuill from "react-quill-new";

const Quill = ReactQuill.Quill;

const Font = Quill.import("formats/font");

Font.whitelist = [
  "arial",
  "roboto",
  "inter",
  "poppins",
  "lato",
  "montserrat",
  "open-sans",
  "raleway",
  "nunito",
  "oswald",
  "times-new-roman",
  "georgia",
  "courier",
];

Quill.register(Font, true);

export const quillModules = {
  toolbar: [
    [{ font: Font.whitelist }],
    [{ size: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
};

export const quillFormats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "color",
  "background",
  "align",
];
