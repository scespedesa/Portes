function Button({children,...props}){
    return(
        <button {...props}
            type="submit"
            className="
                w-full
                bg-slate-700
                hover: bg-blue-800
                text-white
                font-semibold
                py-3
                rounded-lg
                fond_medium
                transition
            "
        >
            {children}
        </button>
    );
}
export default Button;