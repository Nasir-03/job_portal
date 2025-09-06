// const UpdateApplicantStatus = (payload) => {
//   setJobList((prev) =>
//     prev.map((job) =>
//       job.id === payload.jobId
//         ? {
//             ...job,
//             applicants: job.applicants.map((a) =>
//               a.applicantId === payload.applicationId
//                 ? {
//                     ...a,
//                     applicationStatus: payload.applicationStatus,
//                     interviewing: payload.interviewing,
//                   }
//                 : a
//             ),
//           }
//         : job
//     )
//   );
// };


// export default UpdateApplicantStatus;



// updateApplicantStatus.js
const UpdateApplicantStatus = (prev, payload) =>
  prev.map((job) =>
    job.id === payload.jobId
      ? {
          ...job,
          applicants: job.applicants.map((a) =>
            a.applicantId === payload.applicationId
              ? {
                  ...a,
                  applicationStatus: payload.applicationStatus,
                  interviewing: payload.interviewing,
                }
              : a
          ),
        }
      : job
  );

export default UpdateApplicantStatus;
