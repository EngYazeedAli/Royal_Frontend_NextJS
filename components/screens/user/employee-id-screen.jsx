import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "@/styles/employee/id.module.css";
import useWarningDialog from "@/hooks/use-warning-dialog";
import useLoading from "@/hooks/use-loading";
import moment from "moment";
import useSession from "@/hooks/use-session";
import { useRouter } from "next/router";
import EmployeeInfo from "@/components/user/EmployeeInfo";
import EmployeeActions from "@/components/user/EmployeeActions";
import EmployeeIdModels from "@/components/user/EmployeeIdModels";
import useRendered from "@/hooks/use-rendered";

function EmployeeIdScreen({ id }) {
  const rendered = useRendered();
  const [employee, setEmployee] = React.useState();
  const [reason, setReason] = React.useState("");
  const [isReasonDialogOpen, setIsReasonDialogOpen] =
    React.useState(false);
  const [reasoningQuesion, setReasoningQuestion] = React.useState("");
  const [reasonType, setReasonType] = React.useState();

  const { openWarningDialog, closeWarningDialog } = useWarningDialog();
  const { setLoading } = useLoading();
  const { session } = useSession();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employee", "get-employees"],
    queryFn: async () => {
      console.log({ session });
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/my_info/" + id,
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });

  const {
    data: checkData,
    isLoading: checkLoading,
    error: checkError,
    refetch: refetchCheck,
  } = useMutation({
    mutationKey: ["user", "attendance-record"],
    mutationFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/attendance-record/" + id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });


  const {
    mutateAsync: checkIn,
    isPending: isCheckInPending,
    error: checkInError,
  } = useMutation({
    mutationKey: ["user", "check-in"],
    mutationFn: async (reason) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/check-in/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            late_reason: reason,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });

  const {
    mutateAsync: checkOut,
    isPending: isCheckOutPending,
    error: checkOutError,
  } = useMutation({
    mutationKey: ["user", "check-out"],
    mutationFn: async (reason) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/check-out/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            leave_reason: reason,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });

  const onCheckIn = async () => {
    // TODO: Check in handle
    if (checkData?.attendance_record?.checked_in) {
      openWarningDialog({
        title: "Warning",
        content: "You have already checked in.",
      });
      return;
    }

    setLoading(true);

    if (
      moment().isAfter(
        moment({
          hour: 8,
          minute: 30,
        })
      )
    ) {
      // NOTE: Late check in
      setReasonType("check-in");
      setReasoningQuestion(
        "Please provide a reason for checking in late if exists."
      );
      setReason("");
      setIsReasonDialogOpen(true);
      setLoading(false);
      return;
    }

    const data = await checkIn(undefined);
    if (checkInError ?? data?.Error) {
      openWarningDialog({
        title: "Error",
        content: checkInError?.message ?? data?.Error,
      });

      setLoading(false);
      return;
    }

    openWarningDialog({
      title: "Success",
      content: "You have checked in successfully.",
    });

    refetchCheck();
    setLoading(false);
    return router.reload();
  };

  const onCheckOut = async () => {
    // TODO: Check out handle
    if (!checkData?.attendance_record?.checked_in) {
      openWarningDialog({
        title: "Warning",
        content: "You have not checked in yet.",
      });
      return;
    }

    setLoading(true);

    if (
      moment().isBefore(
        moment({
          hour: 15,
          minute: 0,
        })
      )
    ) {
      // NOTE: Early check out
      setReasonType("check-out");
      setReasoningQuestion(
        "Please provide a reason for checking out early if exists."
      );
      setReason("");
      setIsReasonDialogOpen(true);

      setLoading(false);
      return;
    }

    const data = await checkOut(undefined);
    if (checkOutError ?? data?.Error) {
      openWarningDialog({
        title: "Error",
        content: checkOutError?.message ?? data?.Error,
      });

      setLoading(false);
      return;
    }

    openWarningDialog({
      title: "Success",
      content: "You have checked out successfully.",
    });

    refetchCheck();
    setLoading(false);
    return router.reload();
  };

  const onCheckInReasonSubmitted = async () => {
    closeWarningDialog();
    setLoading(true);
    const data = await checkIn(reason);
    if (checkInError ?? data?.Error) {
      openWarningDialog({
        title: "Error",
        content: checkInError?.message ?? data?.Error,
      });

      setLoading(false);
      return;
    }

    closeWarningDialog();
    setIsReasonDialogOpen(false);
    openWarningDialog({
      title: "Success",
      content: "You have checked in successfully.",
    });

    refetchCheck();
    setLoading(false);
    return router.reload();
  };

  const onCheckOutReasonSubmitted = async () => {
    closeWarningDialog();

    setLoading(true);
    const data = await checkOut(reason);
    if (checkOutError ?? data?.Error) {
      openWarningDialog({
        title: "Error",
        content: checkOutError?.message ?? data?.Error,
      });

      setLoading(false);
      return;
    }
    closeWarningDialog();
    setIsReasonDialogOpen(false);
    openWarningDialog({
      title: "Success",
      content: "You have checked out successfully.",
    });

    refetchCheck();
    setLoading(false);
    return router.reload();
  };

  React.useEffect(() => {
    if (data?._id) {
      setEmployee(data);
    }
  }, [data]);

  React.useEffect(() => {
    setLoading(
      isLoading || checkLoading || isCheckInPending || isCheckOutPending
    );
  }, [ isLoading, checkLoading, isCheckInPending, isCheckOutPending, setLoading ]);

  React.useEffect(() => {
    if (error) {
      openWarningDialog({
        title: "Error",
        content: error.message,
      });
    }
  }, [error, openWarningDialog]);

  if (!rendered) return null;
  return (
    <div className={styles.main}>
      <br />
      <h3 style={{
        fontSize: "12px"
      }}>Current Time: {moment().format("hh:mm:ss A")}</h3>
      <EmployeeInfo employee={employee} />
      <br />
      <br />
      <EmployeeActions id={id} checkData={checkData} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
      <EmployeeIdModels isReasonDialogOpen={isReasonDialogOpen} setIsReasonDialogOpen={setIsReasonDialogOpen} setReason={setReason} onCheckInReasonSubmitted={onCheckInReasonSubmitted} onCheckOutReasonSubmitted={onCheckOutReasonSubmitted} reasonType={reasonType} reasoningQuesion={reasoningQuesion} />
    </div>
  );
}

export default EmployeeIdScreen;