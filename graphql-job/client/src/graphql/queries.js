import { gql } from "@apollo/client";
import { request } from 'graphql-request';
import { getAccessToken } from '../auth';

const endpointURL = 'http://localhost:9000/graphql'


// export const client = new ApolloClient({
//   uri: GRAPHQL_URL,
//   cache: new InMemoryCache(),
// });

// async function graphqlRequest(query, variables = {} ) {
//   const response = await fetch(endpointURL, {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       query, variables,
//     }),
//   });
//   const responseBody = await response.json();
  
//     if (responseBody.errors) {
//         const message = responseBody.errors.map((error) => error.message).join('\n');
//         throw new Error(message);
//   }
    
//   return responseBody.data;
// }


export async function loadJobs() {
    
    const query = gql` 
        query {    
            jobs {
                id
                title
                company {
                id
                name
                }
            }
        }`;

    const { jobs } = await request(endpointURL, query);

    return jobs;

}

export async function loadJob(id) {
    const query = ` 
      query JobQuery($id: ID!) {
        job(id: $id) {
            id
            title
            company {
            id
            name
            }
            description
        }
    }`;

    const { job } = await request(endpointURL, query, { id });
 
    return job;
}


export async function loadCompany(id) {
  const query = ` 
      query CompanyQuery ($id: ID!) {
        company (id: $id) {
            id
            name
            description
            jobs {
                id 
                title
            }
        }
    }
`;

  const { company } = await request(endpointURL, query, { id });


  return company;
}


export async function createJob(input) {
  const query = gql`mutation CreateJobMutation ($input: CreateJobInput!){
    createdJob: createJob (
        input: $input
    ) {
        id
      }
}`;

  const variables = { input };
  const headers = { 'Authorization': "Bearer "  + getAccessToken() };
  const { createdJob } = await request(endpointURL, query, variables, headers)  ;

  return createdJob;
}