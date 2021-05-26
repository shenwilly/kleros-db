export type MetaEvidenceJSON = {
    title?: string;
    description?: string;
    question?: string;
    evidenceDisplayInterfaceURI?: string;
    evidenceDisplayHeight?: string,
    fileURI?: string;
    category?: string;

    rulingOptions?: RulingOptions,

    
}

export type RulingOptions = {
    type: string;
    titles: string[],
    descriptions: string[],
}