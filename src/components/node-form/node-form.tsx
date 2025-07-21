import { useState } from "react";
import Button from "../ui/button/button";
import styles from "./styles.module.css";
import Text from "../ui/text/text";

interface IProps {
  initialData?: { name: string; description: string };
  onSubmit: (name: string, description: string) => void;
  onCancel: () => void;
  title: string;
}

export const NodeForm: React.FC<IProps> = ({
  initialData,
  onSubmit,
  onCancel,
  title,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      onSubmit(name.trim(), description.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Text as="h3" size="x2l" textAlign="center" weight="semibold">{title}</Text>

      <div className={styles.group}>
        <Text as="label" htmlFor="name" className={styles.label}>Name:</Text>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter card name"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.group}>
        <Text as="label" htmlFor="description" className={styles.label}>Description:</Text>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter card description"
          className={styles.textarea}
          required
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" onClick={onCancel} variant="outline">
          Ləğv et
        </Button>
        <Button type="submit">
          Təsdiqlə
        </Button>
      </div>
    </form>
  );
};
