import { useState } from "react";
import "./CompletedTask.scss";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type CompletedTaskProps = {
  taskHeading: string;
  category: string;
  points: number;
  description: string;
  image: string;
};

const CompletedTask = ({
  taskHeading,
  category,
  points,
  description,
  image,
}: CompletedTaskProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title={taskHeading}
        subheader={category}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {points} points
        </Typography>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>

          <Typography variant="h3">Media</Typography>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt={taskHeading}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CompletedTask;
