// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { useQuery, useMutation } from 'react-query';
// import { toast } from 'react-toastify';
// import { changePassword, resetPasswordCode } from 'services/auth-service';
// import _, { isEmpty } from 'lodash';
// import { useNavigate } from 'react-router-dom';
// import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
// import { ReactComponent as EyeOffIcon } from '../../assets/icons/eye-off.svg';

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .required('Please type password')
//     .min(8, 'Minimum 8 character'),
//   reTypePassword: Yup.string()
//     .required('Please re-type password')
//     .min(8, 'Minimum 8 character')
//     .oneOf([Yup.ref('password'), null], 'Password did not match'),
// });
// const formOptions = { resolver: yupResolver(validationSchema) };

// export default function ResetPassword() {
//   const navigate = useNavigate();
//   const [passwordShow, setPasswordShow] = useState(false);
//   const [reTypePasswordShow, setReTypePasswordShow] = useState(false);
//   const params = useParams();
//   const { formState, register, handleSubmit } = useForm(formOptions);
//   const { errors } = formState;

//   const {
//     isLoading: checkCodeLoading,
//     data: checkCodeData,
//     error: checkCodeError,
//   } = useQuery(
//     ['CHECK_RESET_PASSWORD_CODE', params],
//     () => resetPasswordCode(params.code),
//     {
//       select: res => res.data,
//       enabled: !isEmpty(params?.code),
//     },
//   );

//   const { mutate: mutateResetPassword, isLoading: resetPasswordLoading } =
//     useMutation(['SUBMIT_CHANGE_PASSWORD'], data => changePassword(data), {
//       onSuccess: res => {
//         toast.success(
//           'Reset password success, please login with your new password!',
//         );
//         navigate('/login');
//       },
//       onError: error => {
//         const message = error || 'Something went wrong';
//         toast.error(message);
//       },
//     });

//   const onSubmit = ({ password }) =>
//     mutateResetPassword({
//       password,
//       code: params.code,
//       email: checkCodeData.EMAIL,
//     });

//   const isLoading = resetPasswordLoading || checkCodeLoading;

//   if (checkCodeError) {
//     return (
//       <dev className="w-screen h-screen flex flex-col items-center justify-center">
//         <p>Code is Expired or Used!</p>
//         <a className="mt-2 text-primary text-underline" href="/login">
//           Login
//         </a>
//       </dev>
//     );
//   }

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <div className="w-11/12 md:w-8/12 lg:w-6/12 shadow-lg pt-10 px-10 pb-12 rounded-xl flex items-center flex-col">
//         <svg
//           width="97"
//           height="97"
//           viewBox="0 0 97 97"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg">
//           <circle cx="48.5" cy="48.5" r="48.5" fill="#6167E7" />
//           <path
//             d="M65.5 42.5H30.5C27.7386 42.5 25.5 44.7386 25.5 47.5V65C25.5 67.7614 27.7386 70 30.5 70H65.5C68.2614 70 70.5 67.7614 70.5 65V47.5C70.5 44.7386 68.2614 42.5 65.5 42.5Z"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M35.5 42.5V32.5C35.5 29.1848 36.817 26.0054 39.1612 23.6612C41.5054 21.317 44.6848 20 48 20C51.3152 20 54.4946 21.317 56.8388 23.6612C59.183 26.0054 60.5 29.1848 60.5 32.5V42.5"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>

//         <p className="text-center text-xl font-bold text-[#000] mt-4">
//           Reset Password
//         </p>
//         <form
//           className="flex flex-col items-start md:w-11/12 md:w-8/12 mt-4"
//           onSubmit={handleSubmit(onSubmit)}>
//           <div className="w-full">
//             <label className="text-sm py-1">New Password</label>
//             <div className="relative">
//               <input
//                 type={passwordShow ? 'text' : 'password'}
//                 className="border-primary border flex-1 w-full rounded px-2 py-2 placeholder-primary placeholder-opacity-50"
//                 placeholder="Type new password"
//                 {...register('password')}
//               />
//               <div
//                 className="absolute right-2 top-[20%] cursor-pointer"
//                 onClick={() => setPasswordShow(s => !s)}>
//                 {passwordShow ? (
//                   <EyeOffIcon className="stroke-primary" />
//                 ) : (
//                   <EyeIcon className="stroke-primary" />
//                 )}
//               </div>
//             </div>
//             <small className="text-error">{errors.password?.message}</small>
//           </div>

//           <div className="w-full mt-2">
//             <label className="text-sm py-1">Confirm New Password</label>
//             <div className="relative">
//               <input
//                 type={reTypePasswordShow ? 'text' : 'password'}
//                 className="border-primary border flex-1 w-full rounded px-2 py-2 placeholder-primary placeholder-opacity-50"
//                 placeholder="Re-type new password"
//                 {...register('reTypePassword')}
//               />
//               <div
//                 className="absolute right-2 top-[20%] cursor-pointer"
//                 onClick={() => setReTypePasswordShow(s => !s)}>
//                 {reTypePasswordShow ? (
//                   <EyeOffIcon className="stroke-primary" />
//                 ) : (
//                   <EyeIcon className="stroke-primary" />
//                 )}
//               </div>
//             </div>
//             <small className="text-error">
//               {errors.reTypePassword?.message}
//             </small>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="bg-primary w-full py-2 mt-6 rounded text-[#FFF] font-bold">
//             {isLoading ? 'Loading...' : 'Reset Password'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
