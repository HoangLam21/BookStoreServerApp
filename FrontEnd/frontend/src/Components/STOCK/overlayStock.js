// import { Fragment } from "react";
// import "./overlay.css";

// export function Overlay({ isOpen, onClose, children }) {
//   return (
//     <Fragment>
//       {isOpen && (
//         <div className="overlay">
//           <div className="overlay__background" onClick={onClose} />
//           <div className="overlay__container">
//             <div className="overlay__controls">
//               <button
//                 className="overlay__close"
//                 type="button"
//                 onClick={onClose}
//               />
//             </div>
//             {children}
//           </div>
//         </div>
//       )}
//     </Fragment>
//   );
// }

// export default Overlay;

import { Fragment } from "react";
import "./overlayStock.css";

export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay__container1">
            <div className="overlay__controls">
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;
