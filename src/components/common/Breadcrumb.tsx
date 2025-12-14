type Crumb = {
    label: string;
    href?: string;
};

const Breadcrumb = ({ items }: { items: Crumb[] }) => {
    return (
        <nav className="text-sm text-gray-500 mb-4">
            <ol className="flex flex-wrap items-center gap-1">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-1">
                            {!isLast && item.href ? (
                                <a
                                    href={item.href}
                                    className="hover:text-indigo-600"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="text-gray-800 font-medium">
                                    {item.label}
                                </span>
                            )}

                            {!isLast && <span>/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
