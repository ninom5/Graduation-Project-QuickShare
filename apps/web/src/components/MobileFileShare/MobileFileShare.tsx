import { useSession } from "api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const MobileFileShare = ({
  guid,
  socket,
}: {
  guid: string | undefined;
  socket: WebSocket;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const { mutate: session } = useSession();

  useEffect(() => {
    if (!guid) {
      toast.error("Error getting guid");
      return;
    }

    session(guid);
  }, [guid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    setFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("File not added");
      return;
    }

    socket.send(file);
  };

  return (
    <section>
      <h2>mobile</h2>

      <div>
        <h3>File input</h3>
        <p>Add files</p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="fileInput">Add File</label>
          <input
            name="fileInput"
            id="fileInput"
            type="file"
            onChange={(e) => handleChange(e)}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};
