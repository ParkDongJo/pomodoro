import Input from './Input';

interface Props {
  order: number;
}
export default function TaskFrom(props: Props) {
  const { order } = props;

  const submit = () => {
  }

  return (
    <div>
      <form onSubmit={submit}>
        <Input />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
