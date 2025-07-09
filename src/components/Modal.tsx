export const Modal = ({
    src,
    onClose,
  }: {
    src: string;
    onClose: () => void;
  }) => (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        cursor: 'zoom-out',
      }}
    >
      <img
        src={src}
        alt="High resolution"
        style={{ maxHeight: '90%', maxWidth: '90%', boxShadow: '0 0 20px black' }}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );