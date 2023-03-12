import { useRouter } from "next/router";
import Appointment from "@/components/Appointment";

export default function () {
  const router = useRouter();
  const { appointment, ts } = router.query;
  return <Appointment id={appointment} ts={ts} />;
}
