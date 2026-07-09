function Card({title,children}){
    return(
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            {title && (
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}

export default Card;