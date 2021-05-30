export const getProofOfHumanitySubmissionURI = (submissionID: string): string => {
    if (submissionID.length === 0) return "";

    return "https://app.proofofhumanity.id/profile/" + submissionID;
}
