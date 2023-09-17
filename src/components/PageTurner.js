export default function PageTurner({currentPage, setCurrentPage, numberOfPages, numberOfResults}) {

    let output = []

    function handlePreviousOrNext(direction) {
        if (direction === "previous" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        } else if (direction === "next" && currentPage < (numberOfPages - 1)) {
            setCurrentPage(currentPage + 1);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }

    for (let i = 0; i < numberOfPages; i++) {
        if (i === currentPage) {
            output.push(<button class="activepage" onClick={() => setCurrentPage(i)}>{i + 1}</button>)
            output.push(" ")
        } else {
        output.push(<button onClick={() => setCurrentPage(i)}>{i + 1}</button>)
        output.push(" ")
        }
    }

    return (
         <>
            <div className="pagebuttons">
                <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
                {output}
                <button onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
            <div className="numberresults">{numberOfResults} results found.</div>
        </>
    )

}