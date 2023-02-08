// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { setVerifyToken } from 'redux/actions/auth/authActions';
// import { useNavigate, useLocation } from 'react-router';

// export default function Auth() {
//   const dispatch = useDispatch();
//   const { search } = useLocation();
//   const history = useNavigate();
//   const params = new URLSearchParams(search);
//   const grant_type = params.get('grant_type');
//   const navigate = params.get('navigate');
//   useEffect(() => {
//     let payload = {};
//     switch (grant_type) {
//       case 'token':
//         payload = {
//           grant_type: 'token',
//           token: params.get('token'),
//         };
//         break;
//     }
//     if (!grant_type) {
//       setTimeout(() => {
//         history('/login');
//       }, 3000);
//       return toast.error('Grant Type is Required!', {
//         position: 'top-center',
//         autoClose: 3000,
//         closeOnClick: true,
//       });
//     }

//     dispatch(
//       setVerifyToken(
//         payload,
//         () => {
//           if (navigate) {
//             return history(navigate);
//           }
//           history('/');
//         },
//         err => {
//           alert('This link you followed has expired');
//           history('/');
//         },
//       ),
//     );
//   }, []);
//   return (
//     <div className="flex justify-center items-center w-screen h-screen">
//       Loading...
//     </div>
//   );
// }
