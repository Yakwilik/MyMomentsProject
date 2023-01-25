export interface trying {
    currentPage: number;
    totalPages: number;
    next?: string;
    callback: ((page:number) => void)
    previous?: string;
}

export function PaginatedData({next, callback, previous, currentPage, totalPages}: trying) {
    return (
        <div className={"my-[10px]"}>
            {/*<div className={} style={{display:'flex', justifyContent:"space-between", alignItems: 'center'}}>*/}
            <div className={"flex justify-between items-center"} >
                {previous ? <button onClick={() => {
                    if (currentPage > 1) {
                        callback(currentPage - 1)
                    }
                }
                }>
                                <img alt={"leftArrowON"} src={"leftOn.png"} style={{display:"inline-block"}}/>
                            </button> :
                            <img alt={"leftArrowOFF"} src={"leftOff.png"} style={{display:"inline-block"}}/>
                }
                {currentPage}
                {next ? <button onClick={() => {
                    if (currentPage < totalPages) {
                        callback(currentPage + 1)}
                    }
                }>
                        <img alt={"rightArrowON"} src={"rightOn.png"} style={{display:"inline-block"}}/>
                    </button> :
                    <img alt={"rightArrowOFF"} src={"rightOff.png"} style={{display:"inline-block", marginLeft: 'auto'}}/>
                }
            </div>
        </div>
    );
};