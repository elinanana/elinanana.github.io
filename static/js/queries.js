// simple query
export const nameQuery = `
  query {
      user {
        firstName
        lastName
      }
  }`;

export const gameQuery = `
  query {
    result {
      attrs
    }
  }`;


// query with arguments
export const auditsReceivedQuery = `
  query {
    transaction (where: { type: { _eq: "down" }}){
      type 
        }
    }`;


// query with arguments
export const auditsDoneQuery = `
  query GetAuditsDoneByUser($userId: Int!) {
    audit(where: { 
      _and: [
        { grade: { _is_null: false } },
        { auditorId: { _eq: $userId } }
      ]
    }) {
      grade
    }
  }`;