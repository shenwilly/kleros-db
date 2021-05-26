// hard coded url mapping

export const getArbitrableSubmissionBaseURI = (address: string): string => {
    let addressMapping: { [key: string]: string } = {
        ["0xc5e9ddebb09cd64dfacab4011a0d5cedaf7c9bdb"]: "asdf",
    };
    
    return addressMapping[address];
}
