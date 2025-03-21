type Props = {
  speaker: "guru" | "user";
  children: React.ReactNode;
};

const Message = ({ speaker, children }: Props) => {
  return (
    <div className="my-2">
      <div>
        <strong>{speaker === "guru" ? "Socsona" : "You"}:</strong>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );
};

export default Message;
