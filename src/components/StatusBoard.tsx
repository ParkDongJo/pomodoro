
interface Props {
  order: number;
  task: string;
}
export default function StatusBoard(props: Props) {
  const { order, task } = props;
  return (
    <div>
      <p>#{order}</p>
      <p>{task}</p>
    </div>
  )
}