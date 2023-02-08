// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { useMutation } from 'react-query';
// import { toast } from 'react-toastify';
// import { changePasswordAuthenticated } from 'services/auth-service';
// import Side from 'components/navigation/Side';
// import { setLogout } from 'redux/actions/auth/authActions';
// import { useDispatch } from 'react-redux';
// import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
// import { ReactComponent as EyeOffIcon } from '../../assets/icons/eye-off.svg';

// const validationSchema = Yup.object().shape({
//   oldPassword: Yup.string().required('Please type current password'),
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
//   const dispatch = useDispatch();
//   const [passwordShow, setPasswordShow] = useState(false);
//   const [oldPasswordShow, setOldPasswordShow] = useState(false);
//   const [reTypePasswordShow, setReTypePasswordShow] = useState(false);
//   const { formState, register, handleSubmit } = useForm(formOptions);
//   const { errors } = formState;

//   const {
//     mutate: mutateResetPassword,
//     data,
//     error,
//     isLoading: resetPasswordLoading,
//   } = useMutation(
//     ['SUBMIT_CHANGE_PASSWORD'],
//     data => changePasswordAuthenticated(data),
//     {
//       onSuccess: res => {
//         toast.success(
//           'Reset password success, please login with your new password!',
//         );
//         dispatch(setLogout());
//       },
//       onError: error => {
//         toast.error(error);
//       },
//     },
//   );

//   const onSubmit = ({ password, oldPassword }) =>
//     mutateResetPassword({
//       password,
//       oldPassword,
//     });

//   const CheckDrawerOpenChild = () => {
//     const p = document.getElementById('Content');
//     const style = window.getComputedStyle(p);
//     if (style.marginLeft == '240px') {
//       document.getElementById('Content').style.transition = 'all 0.2s';
//       document.getElementById('Content').style.marginLeft = '0px';
//     } else {
//       document.getElementById('Content').style.transition = 'all 0.2s';
//       document.getElementById('Content').style.marginLeft = '240px';
//     }
//   };

//   const isLoading = resetPasswordLoading;

//   return (
//     <div>
//       <Side CheckDrawerOpenChild={CheckDrawerOpenChild}></Side>
//       <div
//         id="Content"
//         style={{
//           marginTop: 0,
//           marginLeft: 0,
//           display: 'flex',
//           justifyContent: 'flex-start',
//           minHeight: '100vh',
//           backgroundColor: '#F5F5F5',
//           paddingLeft: 40,
//           paddingRight: 40,
//         }}>
//         <div style={{ marginTop: 70, minWidth: '100%', minHeight: '100%' }}>
//           <div>
//             <div className="flex justify-center items-center">
//               <div className="w-11/12 md:w-8/12 lg:w-6/12 shadow-lg pt-10 px-10 pb-12 rounded-xl flex items-center flex-col bg-white mt-12">
//                 <svg
//                   width="97"
//                   height="97"
//                   viewBox="0 0 97 97"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="48.5" cy="48.5" r="48.5" fill="#6167E7" />
//                   <path
//                     d="M65.5 42.5H30.5C27.7386 42.5 25.5 44.7386 25.5 47.5V65C25.5 67.7614 27.7386 70 30.5 70H65.5C68.2614 70 70.5 67.7614 70.5 65V47.5C70.5 44.7386 68.2614 42.5 65.5 42.5Z"
//                     stroke="white"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M35.5 42.5V32.5C35.5 29.1848 36.817 26.0054 39.1612 23.6612C41.5054 21.317 44.6848 20 48 20C51.3152 20 54.4946 21.317 56.8388 23.6612C59.183 26.0054 60.5 29.1848 60.5 32.5V42.5"
//                     stroke="white"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>

//                 <p className="text-center text-xl font-bold text-[#000] mt-4">
//                   Reset Password
//                 </p>
//                 <form
//                   className="flex flex-col items-start md:w-11/12 md:w-8/12 mt-4"
//                   onSubmit={handleSubmit(onSubmit)}>
//                   <div className="w-full">
//                     <label className="text-sm py-1">Current Password</label>
//                     <div className="relative">
//                       <input
//                         type={oldPasswordShow ? 'text' : 'password'}
//                         className="border-primary border flex-1 w-full rounded px-2 py-2 placeholder-primary placeholder-opacity-50"
//                         placeholder="Type current password"
//                         {...register('oldPassword')}
//                       />
//                       <div
//                         className="absolute right-2 top-[20%] cursor-pointer"
//                         onClick={() => setOldPasswordShow(s => !s)}>
//                         {oldPasswordShow ? (
//                           <EyeOffIcon className="stroke-primary" />
//                         ) : (
//                           <EyeIcon className="stroke-primary" />
//                         )}
//                       </div>
//                     </div>

//                     <small className="text-error">
//                       {errors.oldPassword?.message}
//                     </small>
//                   </div>
//                   <div className="w-full mt-2">
//                     <label className="text-sm py-1">New Password</label>

//                     <div className="relative">
//                       <input
//                         type={passwordShow ? 'text' : 'password'}
//                         className="border-primary border flex-1 w-full rounded px-2 py-2 placeholder-primary placeholder-opacity-50"
//                         placeholder="Type new password"
//                         {...register('password')}
//                       />
//                       <div
//                         className="absolute right-2 top-[20%] cursor-pointer"
//                         onClick={() => setPasswordShow(s => !s)}>
//                         {passwordShow ? (
//                           <EyeOffIcon className="stroke-primary" />
//                         ) : (
//                           <EyeIcon className="stroke-primary" />
//                         )}
//                       </div>
//                     </div>
//                     <small className="text-error">
//                       {errors.password?.message}
//                     </small>
//                   </div>
//                   <div className="w-full mt-2">
//                     <label className="text-sm py-1">Confirm New Password</label>
//                     <div className="relative">
//                       <input
//                         type={reTypePasswordShow ? 'text' : 'password'}
//                         className="border-primary border flex-1 w-full rounded px-2 py-2 placeholder-primary placeholder-opacity-50"
//                         placeholder="Re-type new password"
//                         {...register('reTypePassword')}
//                       />
//                       <div
//                         className="absolute right-2 top-[20%] cursor-pointer"
//                         onClick={() => setReTypePasswordShow(s => !s)}>
//                         {reTypePasswordShow ? (
//                           <EyeOffIcon className="stroke-primary" />
//                         ) : (
//                           <EyeIcon className="stroke-primary" />
//                         )}
//                       </div>
//                     </div>

//                     <small className="text-error">
//                       {errors.reTypePassword?.message}
//                     </small>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="bg-primary w-full py-2 mt-6 rounded text-[#FFF] font-bold">
//                     {isLoading ? 'Loading...' : 'Reset Password'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
