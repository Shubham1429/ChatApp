import React, { forwardRef } from "react";
import "./Message.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const Message = forwardRef(({ message, user }, ref) => {
  const isUSer = user === message.user;

  return (
    <div ref={ref} className={`message ${isUSer && "message__user"}`}>
      <Card className={isUSer ? "message__usercard" : "message__guestcard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUSer && `${message.user || "Unknown User"} : `}{" "}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
