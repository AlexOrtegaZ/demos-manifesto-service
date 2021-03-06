/*
  DEMOS
  Copyright (C) 2022 Julian Alejandro Ortega Zepeda, Erik Ivanov Domínguez Rivera, Luis Ángel Meza Acosta
  This file is part of DEMOS.

  DEMOS is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  DEMOS is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const express = require('express');
const router = express.Router();
const auth = require('../../shared/middlewares/auth');
const validate = require('../../shared/middlewares/validate');
const validations = require('../../validations/comment_vote.validation');
const spaceMember = require('../../shared/middlewares/space-member.middleware');
const commentVoteController = require('../../controllers/comment_vote.conroller');
const canModifyCommentVote = require('../../middlewares/can-modify-comment-vote.middleware');
const canCreateCommentVote = require('../../middlewares/can-create-comment-vote.middleware');

router.post(
  '/:spaceId/:manifestoCommentId/vote',
  auth(),
  validate(validations.isCommentVote),
  spaceMember,
  canCreateCommentVote,
  commentVoteController.createCommentVote
);

router.get(
  '/:spaceId/:manifestoCommentVoteId',
  auth(),
  spaceMember,
  commentVoteController.getCommentVote
);


router.put(
  '/:spaceId/:manifestoCommentVoteId',
  auth(),
  validate(validations.isCommentVote),
  spaceMember,
  canModifyCommentVote,
  commentVoteController.updateCommentVote
);

router.delete(
  '/:spaceId/:manifestoCommentVoteId',
  auth(),
  spaceMember,
  canModifyCommentVote,
  commentVoteController.deleteCommentVote
);

module.exports = router;
